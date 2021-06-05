
class Todo {
  // 変数宣言
  protected title: string;
  protected content: string;
  constructor() {
    this.title = "";
    this.content = "";
  }

  static list() {
    const test = 1;
    return test;
  }
}

export default Todo;
