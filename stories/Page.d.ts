export function Page({ user, onLogin, onLogout, onCreateAccount }: {
    user: any;
    onLogin: any;
    onLogout: any;
    onCreateAccount: any;
}): JSX.Element;
export namespace Page {
    namespace propTypes {
        const user: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const onLogin: PropTypes.Validator<(...args: any[]) => any>;
        const onLogout: PropTypes.Validator<(...args: any[]) => any>;
        const onCreateAccount: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const user_1: null;
        export { user_1 as user };
    }
}
import PropTypes from "prop-types";
