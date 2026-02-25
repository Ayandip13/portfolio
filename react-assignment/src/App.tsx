import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import List from './pages/List';
import Details from './pages/Details';
import PhotoResult from './pages/PhotoResult';
import Charts from './pages/Charts';
import MapPage from './pages/Map';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/list"
                            element={
                                <PrivateRoute>
                                    <List />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/details/:id"
                            element={
                                <PrivateRoute>
                                    <Details />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/photo-result"
                            element={
                                <PrivateRoute>
                                    <PhotoResult />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/charts"
                            element={
                                <PrivateRoute>
                                    <Charts />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/map"
                            element={
                                <PrivateRoute>
                                    <MapPage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
