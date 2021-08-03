import React, { Suspense, useState, useEffect } from 'react'
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { useSelector } from 'react-redux'

// routes config
import adminGudangRoutes from '../routes/adminGudangRoutes';
import marketingRoutes from '../routes/marketingRoutes';
import adminTscRoutes from '../routes/adminTscRoutes';
import teknisiRoutes from '../routes/teknisiRoutes';
  
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const TheContent = () => {
    const currentUser = useSelector(state => state.currentUser);

    const [routes, setRoutes] = useState([]);

    const getCurrentUser = async () => {
        const user = await currentUser;

        switch (user.hak_akses) {
            case 'admin gudang':
                setRoutes(adminGudangRoutes);
                break;
            case 'marketing':
                setRoutes(marketingRoutes);
                break;
            case 'admin tsc':
                setRoutes(adminTscRoutes);
                break;
            case 'teknisi':
                setRoutes(teknisiRoutes);
                break;
            default:
                setRoutes([]);
                break;
        }
    }

    useEffect(() => {
        getCurrentUser();

        return () => {
            setRoutes([]);
        }
    }, []);

    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                        <CFade>
                                            <route.component {...props} />
                                        </CFade>
                                    )} 
                                />
                            )
                        })}
                        <Redirect from="/" to={'/dashboard'} />
                    </Switch>
                </Suspense>
            </CContainer>
        </main>
    )
}

export default React.memo(TheContent)
