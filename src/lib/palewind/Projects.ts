import { get, writable, type Writable } from "svelte/store";
import { palette, readPaletteFromString, type PalewindProject } from "./Palewind";
import defaultPalette from "./default-palette.txt?raw";

/**
 * The project we currently have open.
 * Changing this will automatically load it into palette
 */
export const currentProjectID: Writable<number> = writable(0);

/** So we know what the UUIDs on disk are. Modifying this will automatically save to disk */
export const allProjectUUIDs: Writable<string[]> = writable([]);

/**
 * List of projects the user has. Loaded from disk on startup.
 */
export const projects: Writable<PalewindProject[]> = writable([]);

projects.set(loadProjectsFromStorage());

function loadProjectsFromStorage() {
	// Load allProjectUUIDs
	let projectIDs = localStorage.getItem("projects");
	if (!projectIDs) {
		// No projects on disk, create default project
		let id = crypto.randomUUID();
		let pids = get(allProjectUUIDs);
		pids.push(id);
		allProjectUUIDs.set(pids);
		let palette = readPaletteFromString(defaultPalette);
		return [
			{
				id: id,
				name: "Default (click here to rename)",
				palette: palette,
			},
		];
	} else {
		allProjectUUIDs.set(JSON.parse(projectIDs));
	}

	let result: PalewindProject[] = [];

	for (const id of get(allProjectUUIDs) as string[]) {
		let loadedProject = localStorage.getItem(`project-${id}`);
		if (loadedProject) {
			result.push(JSON.parse(loadedProject));
		}
	}

	return result;
}

export function createProject() {
	let palette = readPaletteFromString(defaultPalette);
	let newProject = {
		id: crypto.randomUUID(),
		name: "New Project",
		palette: palette,
	};

	// Register new ID to our list of IDs (auto saved)
	let pids = get(allProjectUUIDs);
	pids.push(newProject.id);
	allProjectUUIDs.set(pids);

	// Add project to list (does not save to disk)
	let p = get(projects);
	let newIndex = p.push(newProject) - 1;
	projects.set(p);

	// Open it (will trigger save on project)
	currentProjectID.set(newIndex);
}

export function deleteProject(index: number) {
	// Get the project ID
	let p = get(projects);
	let uuid = p[index].id;

	// Nuke it
	p.splice(index, 1);
	projects.set(p);
	localStorage.removeItem(`project-${uuid}`);

	// Remove it from our list of projects
	let temp = get(allProjectUUIDs);
	temp.splice(index, 1);
	allProjectUUIDs.set(temp);

	// If we deleted a project lower than the current one
	// We need to adjust the currently open project
	if (index < get(currentProjectID)) {
		currentProjectID.set(get(currentProjectID) - 1);
	}
}

currentProjectID.subscribe((value) => {
	palette.set(get(projects)[value].palette);
});

allProjectUUIDs.subscribe((value) => {
	localStorage.setItem("projects", JSON.stringify(value));
});
