import FS from '../../src/modules/fileStorage/FS';

describe('FS class', () => {
    const testDirectory = './testDirectory';
    let fileSystem: FS;

    beforeEach(() => {
        fileSystem = new FS(testDirectory);
    });


    it('should store and retrieve content', async () => {
        const filename = 'test.txt';
        const content = 'This is a test content.';

        await fileSystem.store(filename, content);

        const retrievedContent = await fileSystem.get(filename);

        expect(retrievedContent).toBe(content);
    });

    it('should return null for non-existent files', async () => {
        const filename = 'nonexistent.txt';

        const retrievedContent = await fileSystem.get(filename);

        expect(retrievedContent).toBeNull();
    });

    it('should handle storing and retrieving empty content', async () => {
        const filename = 'empty.txt';
        const emptyContent = '';

        await fileSystem.store(filename, emptyContent);

        const retrievedContent = await fileSystem.get(filename);

        expect(retrievedContent).toBe(emptyContent);
    });

    it('should handle storing and retrieving content with special characters', async () => {
        const filename = 'special.txt';
        const specialContent = 'Special characters: $%^&*()';

        await fileSystem.store(filename, specialContent);

        const retrievedContent = await fileSystem.get(filename);

        expect(retrievedContent).toBe(specialContent);
    });

    it('should handle storing content with the same content but different filenames', async () => {
        const content = 'Duplicate content.';
        const filename1 = 'duplicate1.txt';
        const filename2 = 'duplicate2.txt';

        await fileSystem.store(filename1, content);
        await fileSystem.store(filename2, content);

        const retrievedContent1 = await fileSystem.get(filename1);
        const retrievedContent2 = await fileSystem.get(filename2);

        expect(retrievedContent1).toBe(content);
        expect(retrievedContent2).toBe(content);
    });
    
    it('should handle reading from a non-existent directory', async () => {
        const invalidDirectory = './nonexistentDirectory';
        const fileSystem = new FS(invalidDirectory);
    
        const filename = 'test.txt';
    
        const retrievedContent = await fileSystem.get(filename);
    
        expect(retrievedContent).toBeNull();
    });

    it('should handle storing content with invalid characters in the filename', async () => {
        const invalidFilename = 'file*name.txt';
        const content = 'Invalid filename content.';
    
        await fileSystem.store(invalidFilename, content);
    
        const retrievedContent = await fileSystem.get(invalidFilename);
    
        expect(retrievedContent).toBe(content);
    });
});
