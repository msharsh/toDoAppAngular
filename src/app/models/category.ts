export class ToDoCategory {
    constructor(public id: number, public name: string) { }
}

export function compareCategories(c1: ToDoCategory, c2: ToDoCategory): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
}