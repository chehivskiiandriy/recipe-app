import React from 'react';
import classnames from 'classnames';

class Filters extends React.Component {
    state = {
        active: false,
        selected: {name: '', color: '', type: ''}
    };

    handleClick = () => {
        this.setState({ active: !this.state.active });
    };

    handleSelect = item => {
        this.setState({ selected: item });
        this.props.setFilter(item.type)
    };

    render () {
        const { type, values} = this.props;
        const { active, selected } = this.state;
        return (
            <div className={classnames('ui floating dropdown labeled icon button',
                {active: active})} onClick={this.handleClick}>
                <i className="filter icon" />
                <span className="text">
                    {selected.type ? <div className={classnames('ui empty circular label', selected.color)} /> : null }
                    {selected.name || type + ' Recipes'}
                </span>
                <div className={classnames('menu transition', {visible: active})}>
                    <div className="scrolling menu">
                        {
                            values.map(item => (
                                <div key={item.name}
                                     className={classnames('item', {active: item.name === selected.name})}
                                     onClick={() => this.handleSelect(item)}>
                                    <div className={classnames('ui empty circular label', item.color)} />
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Filters;