import { App } from "vue";
import registerELement from "./register-element";
import registerProperties from "./register-properties";
export function globalRegisterApp(app: App): void {
    // registerELement(app);
    // registerProperties(app);
    app.use(registerELement);
    app.use(registerProperties);
}
