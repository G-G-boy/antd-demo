import {mount} from '@cypress/react';
import App from './App';

it('App组件测试', () => {
    mount(<App />);
    cy.get('a').contains('Learn React');
});
