import React from 'react';
import { MDBDatePicker, MDBIcon } from 'mdbreact';

import moment from 'moment';
import 'moment/locale/cs';

class DatePickerPage extends React.Component {
    getPickerValue = (value) => {
        console.log(value);
    }
    componentDidMount(){
        console.log(moment());
    }

    render() {
        return (
            <div>
                <MDBDatePicker clearable clearLabel="Resetovat" cancelLabel="Zavřít" locale={moment.locale('cs')} getValue={this.getPickerValue} />
            </div>
        );
    }
};

export default DatePickerPage;