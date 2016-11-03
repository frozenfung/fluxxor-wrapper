const React = require('react');

function fluxxorWrapper(WrappedComponent, flux, fluxxorStores, fluxxorProps) {
  return class fluxxorController extends React.Component {
    constructor(props) {
      super(props);

      this.setStateFromFlux = this.setStateFromFlux.bind(this);

      this.state = {
        fluxProps: {},
      };
    }

    componentDidMount() {
      fluxxorStores.forEach((store) => {
        flux.store(store).on(
          "change",
          this.setStateFromFlux
        )
      }, this);
    }

    componentWillUnmount() {
      fluxxorStores.forEach((store) => {
        flux.store(store).removeListener(
          "change",
          this.setStateFromFlux
        )
      }, this);
    }

    setStateFromFlux() {
      this.setState({ fluxProps: this.getStateFromFlux() });
    }

    getStateFromFlux() {
      return fluxxorProps(flux);
    }

    getFlux() {
      return flux;
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
