import path from 'path';

const defaultOptions = {
  snapshotsDirName: '__snapshots__',
  snapshotExtension: '.storyshot',
  storiesExtensions: ['.js', '.jsx', '.ts', '.tsx'],
};

class DefaultStories2SnapsConverter {
  options: {
    storiesExtensions: string[];
    snapshotExtension: string;
    snapshotsDirName: string;
  };

  constructor(options = {}) {
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

  getSnapshotFileName(context: any) {
    const { fileName } = context;

    if (!fileName) {
      return null;
    }

    return this.getStoryshotFile(fileName);
  }

  getPossibleStoriesFiles(storyshotFile: string) {
    const { dir, name } = path.parse(storyshotFile);
    const { storiesExtensions } = this.options;

    return (storiesExtensions as string[]).map(ext =>
      path.format({
        dir: path.dirname(dir),
        name,
        ext,
      })
    );
  }
}

export default DefaultStories2SnapsConverter;
