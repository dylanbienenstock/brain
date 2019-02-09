import { ToolSelectorComponent } from "./components/tool-selector/tool-selector.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { AuthenticatorComponent } from "./components/authenticator/authenticator.component";
import { IntakeLogComponent } from "./components/intake-log/intake-log.component";

export const AppRoutes = [
    {
        path: "task-manager",
        component: TaskListComponent,
    },
    {
        path: "intake-log",
        component: IntakeLogComponent,
    },
    {
        path: "authenticate",
        redirectTo: ""
    },
    {
        path: "",
        component: ToolSelectorComponent,
    }
];