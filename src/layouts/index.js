import Provider from '../locale/provider';
import Main from './main';

export default function({children}) {
    return (
      <Provider>
        <Main>
          {children}
        </Main>
      </Provider>
    );
}