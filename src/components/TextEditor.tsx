import React, { useState } from 'react';

interface File {
    name: string;
    content: string;
}

interface Folder {
    name: string;
    files: File[];
    folders: Folder[];
}

const initialFolder: Folder = {
    name: 'Root',
    files: [
        { name: 'file1.txt', content: 'File 1 content' },
        { name: 'file2.txt', content: 'File 2 content' }
    ],
    folders: [
        {
            name: 'Folder 1',
            files: [
                { name: 'file3.txt', content: 'File 3 content' }
            ],
            folders: []
        },
        {
            name: 'Folder 2',
            files: [],
            folders: [
                {
                    name: 'Subfolder 1',
                    files: [
                        { name: 'file4.txt', content: 'File 4 content' }
                    ],
                    folders: []
                }
            ]
        }
    ]
};


const TextEditor: React.FC = () => {
    const [currentFolder, setCurrentFolder] = useState<Folder>(initialFolder);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const handleFileClick = (file: File) => {
        setCurrentFile(file);
    };

    const handleFolderClick = (folder: Folder) => {
        setCurrentFolder(folder);
        setCurrentFile(null);
    };
    const renderFiles = (files: File[]) => {
        return files.map((file, index) => (
            <div key={index} onClick={() => handleFileClick(file)}>
                {file.name}
            </div>
        ));
    };

    const renderFolders = (folders: Folder[]) => {
        return folders.map((folder, index) => (
            <div key={index} onClick={() => handleFolderClick(folder)}>
                {folder.name}
            </div>
        ));
    };

    return (
        <div>
            <div>
                <h2>Files and Folders</h2>
                {renderFolders(currentFolder.folders)}
                {renderFiles(currentFolder.files)}
            </div>
            <div>
                <h2>Editor</h2>
                {currentFile ? (
                    <textarea value={currentFile.content} readOnly />
                ) : (
                    <p>No file selected</p>
                )}
            </div>
        </div>
    );
};

export default TextEditor;
