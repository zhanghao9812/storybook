import path from 'path';

const defaultOptions: Stories2SnapsConverterOptions = {
  snapshotsDirName: '__snapshots__',
  snapshotExtension: '.storyshot',
  storiesExtensions: ['.js', '.jsx', '.ts', '.tsx'],
};

export interface Stories2SnapsConverterOptions {
  storiesExtensions: string[];
  snapshotExtension: string;
  snapshotsDirName: string;
}

export class Stories2SnapsConverter {
  options: Stories2SnapsConverterOptions;

  constructor(options: Partial<Stories2SnapsConverterOptions> = {}) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  getSnapshotExtension = () => this.options.snapshotExtension;

  getStoryshotFile(fileName: string) {
    const { dir, name } = path.parse(fileName);
    const { snapshotsDirName, snapshotExtension } = this.options;

    return path.format({ dir: path.join(dir, snapshotsDirName), name, ext: snapshotExtension });
  }

  getSnapshotFileName(context: { fileName?: string }) {
    const { fileName } = context;

    if (!fileName) {
      return null;
    }

    return this.getStoryshotFile(fileName);
  }

  getPossibleStoriesFiles(storyshotFile: string) {
    const { dir, name } = path.parse(storyshotFile);
    const { storiesExtensions } = this.options;

    return storiesExtensions.map(ext =>
      path.format({
        dir: path.dirname(dir),
        name,
        ext,
      })
    );
  }
}
