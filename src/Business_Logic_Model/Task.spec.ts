import TaskEntity from "./TaskEntity";
describe("TaskEntity", () => {
  describe("TaskEntity Object Exists", () => {
    expect(new TaskEntity(`startDemoProject`)).not.toBeUndefined();
  });
  describe("States", () => {
    it(`should be todo by default`, () => {
      const aTask = new TaskEntity(`startDemoProject`);
      expect(aTask.name).toEqual("startDemoProject");
      expect(aTask.status.display).toEqual("todo");
    });
    it(`should be able to transition task to in progress`, () => {
      const aTask = new TaskEntity(`startDemoProject`);
      aTask.startProgress();
      expect(aTask.name).toEqual("startDemoProject");
      expect(aTask.status.display).toEqual("in progress");
    });
    it(`should be able to transition task to in progress`, () => {
      const aTask = new TaskEntity(`startDemoProject`);
      aTask.makeProgress();
      expect(aTask.name).toEqual("startDemoProject");
      expect(aTask.status.display).toEqual("in progress");
    });
    it(`should be able to transition task from in progress to done`, () => {
      const aTask = new TaskEntity(`startDemoProject`);
      aTask.startProgress();
      aTask.finish();
      expect(aTask.status.display).toEqual("done");
    });
    it(`should be able to transition task from done to in progress`, () => {
      const aTask = new TaskEntity(`startDemoProject`);
      aTask.startProgress();
      aTask.finish();
      aTask.moveBackwards();
      expect(aTask.status.display).toEqual("in progress");
    });
    it(`should not transition from todo directly to done`, () => {
      const testTask = new TaskEntity(`startDemoProject`);
      testTask.finish();
      expect(testTask.status.display).not.toEqual("done");
    });
    it(`should not transition from in progress to todo`, () => {
      const testTask = new TaskEntity(`startDemoProject`);
      testTask.startProgress();
      testTask.moveBackwards();
      expect(testTask.status.display).not.toEqual("todo");
    });
  });
  describe("TaskEntity Creation", () => {
    it(`should shorten a task name longer than 30 characters`, () => {
      const longName31Characters = `0123456789012345678901234567890`;
      expect(
        new TaskEntity(longName31Characters).name.length
      ).toBeLessThanOrEqual(30);
    });
  });
});
