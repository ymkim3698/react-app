import * as React from "react";
import { createRoot } from "react-dom/client";
import * as FlexLayout from "flexlayout-react";

var json = {
  global: {},
  borders: [
    {
      type: "border",
      location: "left",
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Navigation",
          component: "grid",
        }
      ]
    },
    {
      type: "border",
      location: "right",
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Options",
          component: "grid",
        }
      ]
    },
    {
      type: "border",
      location: "bottom",
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Activity Blotter",
          component: "grid",
        },
        {
          type: "tab",
          enableClose: false,
          name: "Execution Blotter",
          component: "grid",
        }
      ]
    }
  ],
  layout: {
      type: "row",
      weight: 100,
      children: [
          {
              type: "tabset",
              weight: 50,
              children: [
                  {
                      type: "tab",
                      name: "One",
                      component: "button",
                  }
              ]
          },
          {
              type: "tabset",
              weight: 50,
              children: [
                  {
                      type: "tab",
                      name: "Two",
                      component: "button",
                  }
              ]
          }
      ]
  }
};

export default class Flex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {model: FlexLayout.Model.fromJson(json)};
    }

    factory = (node) => {
        var component = node.getComponent();
        if (component === "button") {
            return <button>{node.getName()}</button>;
        }
    }

    render() {
        return (
            <FlexLayout.Layout model={this.state.model} factory={this.factory}/>
        )
    }
}