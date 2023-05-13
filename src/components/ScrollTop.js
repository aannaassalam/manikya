import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollTop({ history }) {
  useEffect(() => {
    const unlisted = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisted();
    }
  }, []);

  return (null);
}

export default withRouter(ScrollTop);