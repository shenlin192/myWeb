/**
 * Created by shenlin on 6/13/17.
 */
import React from 'react';

//components
import InvestmentAndResa from './InvestmentAndResa';
import Repartition from './repartition';

//style
import "./portefeuille.css"

export default class Portefeuille extends React.Component {
    render() {
        return (
            <div className="portefeuille">
                <InvestmentAndResa/>
                <Repartition/>
            </div>
        )
    }
}


