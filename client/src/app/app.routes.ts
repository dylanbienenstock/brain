import { ToolSelectorComponent } from "./components/tool-selector/tool-selector.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { AuthenticatorComponent } from "./components/authenticator/authenticator.component";

export const AppRoutes = [
    {
        path: "tasks",
        component: TaskListComponent,
    },
    {
        path: "",
        component: ToolSelectorComponent,
    }
];