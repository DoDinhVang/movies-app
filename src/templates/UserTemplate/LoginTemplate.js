import { Route } from 'react-router-dom'

const LoginTemplate = (props) => {
    const { Component, ...resProps } = props;
    return (
        <Route {...resProps} render={(propRoute) => {
            return <>
                <section className="min-h-screen flex items-stretch text-white ">
                    <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'"}}></div>
                    <Component {...propRoute} />
                </section>

            </>
        }}>
        </Route>
    )
}
export default LoginTemplate