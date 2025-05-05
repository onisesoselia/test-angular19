export class Todo {
  constructor(
    public name: string,
    public completed: boolean = false,
    public id?: string
  ) {}
}
