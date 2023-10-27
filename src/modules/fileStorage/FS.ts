import * as fs from 'fs';
import * as path from 'path';
import { computeMD5Hash } from '../../utils/hash';

class FS {
    private directory: string;

    constructor(directory: string) {
        this.directory = directory;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    /**
     * Stores the content using the hash of the content. 
     * 
     * @param filename - The filename for the content.
     * @param content - The content to store.
     */
    store(filename: string, content: string): void {
        const hash = computeMD5Hash(content);
        const filePath = path.join(this.directory, hash);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }
        let mapping: { [filename: string]: string } = {};
        const mappingFilePath = path.join(this.directory, 'mapping.json');
        if (fs.existsSync(mappingFilePath)) {
            mapping = JSON.parse(fs.readFileSync(mappingFilePath, 'utf8'));
        }
        mapping[filename] = hash;
        fs.writeFileSync(mappingFilePath, JSON.stringify(mapping));
    }

    /**
     * Returns the content based on a filename.
     * 
     * @param filename - The filename to retrieve content for.
     * @returns The content of the file, or null if not found.
     */
    get(filename: string): string | null {
        const mappingFilePath = path.join(this.directory, 'mapping.json');
        if (fs.existsSync(mappingFilePath)) {
            const mapping = JSON.parse(fs.readFileSync(mappingFilePath, 'utf8'));
            if (mapping[filename]) {
                const contentFilePath = path.join(this.directory, mapping[filename]);
                if (fs.existsSync(contentFilePath)) {
                    return fs.readFileSync(contentFilePath, 'utf8');
                }
            }
        }
        return null;
    }
}

export default FS;
