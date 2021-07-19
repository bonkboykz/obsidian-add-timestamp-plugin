import { join } from 'path';
import { Notice, Plugin } from 'obsidian';
import { format } from 'date-fns';

export default class AddTimestampPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'add-timestamp',
			name: 'Add Timestamp',
			editorCallback: async (_editor, view) => {
				const vault = this.app.vault;
				const currentTimestamp = format(Date.now(), 'YMMddHHmmss');
				const newFileName = `${currentTimestamp} ${view.file.name}`;
				const fileEntity = vault.getFiles().find(file => file.path === view.file.path);
				const pathArray = view.file.path.split('/');
				const newFilePath = join(...pathArray.slice(0, pathArray.length - 1), newFileName);

				await vault.rename(fileEntity, newFilePath);

				new Notice('File renamed successfully');
			}
		});
	}
}
