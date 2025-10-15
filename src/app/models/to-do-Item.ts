import { ToDoCategory } from "./category";

export class ToDoItem {
    constructor(
        public id: number,
        public description: string,
        public category?: ToDoCategory,
        public completed: boolean = false
    ) { }
}
