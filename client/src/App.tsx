import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper, Title } from "./components/AppStyles";
import GoogleAuth from "./components/GoogleAuth";

import LeftPanel from "./pages/LeftPanel";
import AboutMePage from "./pages/AboutMePage";
import WelcomePage from "./pages/WelcomePage";
import ContactPage from "./pages/ContactPage";
import PostList from "./pages/PostList";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import AddCommentPage from "./pages/AddCommentPage";
import NoPage from "./pages/NoPage";
import PostDelete from "./pages/PostDelete";

class App extends Component<{}, {}> {
    render() {
        return (
            <>
                {" "}
                <GoogleAuth />
                <header>
                    <Title>Blog Beaty</Title>
                </header>
                <Wrapper>
                    <BrowserRouter>
                        <LeftPanel />
                        <Routes>
                            <Route path="/Welcome" element={<WelcomePage />} />
                            <Route path="/AboutMe" element={<AboutMePage />} />
                            <Route path="/Blog" element={<PostList />} />
                            <Route
                                path="/Blog/add"
                                element={<CreatePostPage />}
                            />
                            <Route
                                path="/Blog/edit/id/:id"
                                element={<EditPostPage />}
                            />
                            <Route
                                path="/Blog/delete/id/:id"
                                element={<PostDelete />}
                            />
                            <Route
                                path="/Comment/add"
                                element={<AddCommentPage />}
                            />
                            <Route path="/Contact" element={<ContactPage />} />
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                    </BrowserRouter>
                </Wrapper>
            </>
        );
    }
}

export default App;
