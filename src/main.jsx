import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import Query from "./services/query/index.jsx";
import Theme from "./theme/theme.jsx";
import Router from "./router/router.jsx";
import OverlayLoader from "./components/OverlayLoader.jsx";
import Auth from "./services/auth/Auth.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<OverlayLoader/>}>
        <Query>
            <Theme>
                <Auth>
                    <Router/>
                </Auth>
            </Theme>
        </Query>
    </Suspense>
)
