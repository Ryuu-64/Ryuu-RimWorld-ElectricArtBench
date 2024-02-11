import * as fs from 'fs-extra';

buildProject();

async function buildProject(): Promise<void> {
    try {
        const readConfigPromise: Promise<ProjectConfig> = fs.readJSON(
            "./src/config/projectConfig.json",
            {
                encoding: "utf8"
            }
        );
        const info = await readConfigPromise;
        await fs.remove(info.releaseFolder);

        await Promise.all([
            fs.copy("../1.4/Assemblies", info.releaseFolder + info.projectName + "/1.4/Assemblies"),
            fs.copy("../1.4/Defs", info.releaseFolder + info.projectName + "/1.4/Defs"),
            fs.copy("../1.4/Patches", info.releaseFolder + info.projectName + "/1.4/Patches"),
            fs.copy("../About", info.releaseFolder + info.projectName + "/About"),
            fs.copy("../Languages", info.releaseFolder + info.projectName + "/Languages")
        ]);
        console.log("Build completed successfully.");
    } catch (err) {
        console.error('An error occurred during build:', err);
    }
}

class ProjectConfig {
    releaseFolder: string;
    projectName: string;

    constructor(releaseFolder: string, projectName: string) {
        this.releaseFolder = releaseFolder;
        this.projectName = projectName;
    }
}