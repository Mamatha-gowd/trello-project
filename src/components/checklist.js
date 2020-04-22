import React, { Component } from "react";
import CheckItem from "./checkitems";
import Addcheckitem from "./addcheckitem";

const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkItems: this.props.checklistdata.checkitems,
      addcheckitem: false,
      input: "",
    };
  }

  showCheckItemCard = () => {
    this.setState({
      addcheckitem: true,
    });
  };

  cancelCheckItemCard = (e) => {
    e.preventDefault();
    this.setState({
      addcheckitem: false,
    });
  };

  //   handleChange = (e) => {
  //     this.setState({
  //       input: e.target.value,
  //     });
  //   };

  render() {
    console.log(this.props.checklistdata.checkitems);
    return (
      <div className="checkitem">
        <div className="d-flex justify-content-between align-items-center">
          {this.props.checklistdata.name}
          <button
            className="btn btn-light"
            onClick={(e) =>
              this.props.deleteChecklist(
                e,
                this.props.checklistdata.checklistid
              )
            }
          >
            Remove
          </button>
        </div>
        <div className="display-checkitems">
          {this.state.checkItems.map((checkitems) => {
            return (
              <CheckItem
                key={checkitems.id}
                checkitems={checkitems}
                checklist={this.props.checklistdata}
                onRemove={this.props.handleDeleteCheckItem}
              />
            );
          })}
        </div>
        {this.state.addcheckitem ? (
          <Addcheckitem
            onAdd={this.props.handleCheckitem}
            checklist={this.props.checklistdata}
            checklistid={this.props.checklistdata.checklistid}
            onDelete={this.cancelCheckItemCard}
          />
        ) : (
          <div
            className="btn btn secondary  add-item"
            onClick={this.showCheckItemCard}
          >
            Add item
          </div>
        )}
      </div>
    );
  }
}
export default CheckList;
