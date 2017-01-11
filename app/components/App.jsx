import React, {Component} from 'react';
import '../global.pcss'
import Layout from './Layout';
import Counter from './Counter';
import styles from './App.pcss';
import './App.chilren.pcss'

require('./test.css')

// If you use React Router, make this component render <Router> with your routes.
// Currently, only synchronous routes are hot reloaded, and you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

class App extends Component {
    render() {
        return (
            <Layout>
                <a className={styles.center} href="http://0.0.0.0:61200/login.html">login22</a>
                <div>
                    <h2 className='yGreen'>App</h2>
                    <h3 className={styles.root}>compose</h3>
                    <h3 className={styles.text}>compose</h3>
                    <h3 className={styles.text2}>compose</h3>
                    <Counter />
                </div>
            </Layout>
        );
    }
}

export default App;