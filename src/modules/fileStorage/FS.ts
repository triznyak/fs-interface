import * as fs from 'fs/promises';
import * as path from 'path';
import { computeMD5Hash } from '../../utils/hash';

class FS {
    private directory: string;

    constructor(directory: string) {
        this.directory = directory;
        this.ensureDirectoryExists();
    }

    /**
     * Stores the content using the hash of the content. 
     * 
     * @param filename - The filename for the content.
     * @param content - The content to store.
     */
    async store(filename: string, content: string): Promise<void> {
        const hash = computeMD5Hash(content);
        const filePath = path.join(this.directory, hash);

        try {
            await fs.writeFile(filePath, content);

            const mapping = await this.readMappingFile();
            mapping[filename] = hash;

            await this.writeMappingFile(mapping);
        } catch (error) {
            console.error('Error storing content:', error);
        }
    }

    /**
     * Returns the content based on a filename.
     * 
     * @param filename - The filename to retrieve content for.
     * @returns The content of the file, or null if not found.
     */
    async get(filename: string): Promise<string | null> {
        const mapping = await this.readMappingFile();
        const hash = mapping[filename];

        if (hash) {
            const contentFilePath = path.join(this.directory, hash);

            try {
                const content = await fs.readFile(contentFilePath, 'utf8');
                return content;
            } catch (error) {
                console.error('Error getting content:', error);
            }
        }

        return null;
    }
    /**
     * Ensures that the specified directory exists or creates it if it doesn't.
     * If the directory already exists, this method does nothing.
     */
    private async ensureDirectoryExists(): Promise<void> {
        try {
            await fs.access(this.directory);
        } catch (error) {
            await fs.mkdir(this.directory, { recursive: true });
        }
    }
    /**
     * Reads the mapping file from disk and returns its content as a JavaScript object.
     * If the mapping file does not exist, an empty object is returned.
     */
    private async readMappingFile(): Promise<{ [filename: string]: string }> {
        const mappingFilePath = path.join(this.directory, 'mapping.json');

        try {
            const mappingContent = await fs.readFile(mappingFilePath, 'utf8');
            return JSON.parse(mappingContent);
        } catch (error) {
            console.error('Mapping file does not exist');
            return {};
        }
    }
    /**
     * Writes the provided mapping object to the mapping file on disk.
     * If an error occurs during the write operation, it is logged.
     */
    private async writeMappingFile(mapping: { [filename: string]: string }): Promise<void> {
        const mappingFilePath = path.join(this.directory, 'mapping.json');

        try {
            await fs.writeFile(mappingFilePath, JSON.stringify(mapping));
        } catch (error) {
            console.error('Error writing mapping file:', error);
        }
    }
}

export default FS;
