const React = require('react');

function fluxxorWrapper(WrappedComponent, flux, fluxxorStores, fluxxorProps) {
  return class fluxxorController extends React.Component {
    constructor(props) {
      super(props);

      this.setStateFromFlux = this.setStateFromFlux.bind(this);
      this.getStateFromFlux = this.getStateFromFlux.bind(this);
      this.getFlux = this.getFlux.bind(this);
      this.fluxIns = flux(props.fluxInitObj && JSON.parse(props.fluxInitObj));

      this.state = {
        fluxProps: this.getStateFromFlux(),
      };
    }

    componentDidMount() {
      fluxxorStores.forEach((store) => {
        this.fluxIns.store(store).on(
          "change",
          this.setStateFromFlux
        )
      }, this);
    }

    componentWillUnmount() {
      fluxxorStores.forEach((store) => {
        this.fluxIns.store(store).removeListener(
          "change",
          this.setStateFromFlux
        )
      }, this);
    }

    setStateFromFlux() {
      this.setState({ fluxProps: this.getStateFromFlux() });
    }

    getStateFromFlux() {
      return fluxxorProps(this.fluxIns);
    }

    getFlux() {
      return this.fluxIns;
    }

    render() {
      let propsFromFlux = {};

      Object.keys(this.state.fluxProps).forEach((key) => {
        propsFromFlux[key] = this.state.fluxProps[key];
      }, this);

      const mergedProps = Object.assign({}, this.props, propsFromFlux);

      return (
        <WrappedComponent
          { ...mergedProps }
          getFlux={ this.getFlux }
        />
      );
    }
  };
}

module.exports = fluxxorWrapper;
