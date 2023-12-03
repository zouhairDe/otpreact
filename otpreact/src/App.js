import React from 'react';
import ReactDOM from 'react-dom';
import OtpComponent from './OtpComponent';

const App = () => {
  return (
    <div>
      <OtpComponent />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;