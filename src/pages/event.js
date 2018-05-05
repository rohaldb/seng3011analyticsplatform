import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
import { Grid, Row, Col } from 'react-flexbox-grid';
// import { SimpleMap } from '../SimpleMap';
import SimpleMap from '../SimpleMap';
// import { SimpleMap } from './layouts/Home';

const styles = theme => ({
  roots: {
        border: '1px'
  },
  grid: {
    margin: '10%'
    // marginLeft: '5%',
    // marginRight: '5%'
  },
  box: {
    border: 'solid 1px black',
    margin: '2%',
    padding: '5%'
  },
  maps: {
    margin: '2%',
    width: '100px',
    height: '200px',
    // border: 'solid 1px black',
    // padding: '5%'
  },
  stocks: {
      margin: '2%',
      width: '100px',
      height: '200px',
      border: 'solid 1px black',
      padding: '5%'
  }

})

class Event extends React.Component {

  render () {
    const { classes, eventID } = this.props
    const EventData = Events[eventID]

    // return (
    //   <div className={classes.root}>
    //     <h1>{EventData.name}</h1>
    //     <h3>{EventData.description}</h3>
    //     <h3>start: {EventData.start_date}</h3>
    //     <h3>end: {EventData.end_date}</h3>
    //     <h3>related companies: {EventData.related_companies.join(', ')}</h3>
    //   </div>
    // );
    return (

      <Grid fluid className={classes.grid}>
        <Row className={classes.row} around="xs">
          <Col className={classes.box} xs>
              <h1>{EventData.name}</h1>
              <h3>{EventData.description}</h3>
              <h3>start: {EventData.start_date}</h3>
              <h3>end: {EventData.end_date}</h3>
          </Col>
         </Row>

         <Row className={classes.row} around="xs">
          <Col className={classes.box} xs>
            Effected Companie 1
          </Col>
          <Col className={classes.box} xs>
            Effected Companie 2
          </Col>
          <Col className={classes.box} xs>
            Effected Companie 3
          </Col>
        </Row>

        <Row className={classes.row} around="xs">
         <Col className={classes.stocks} xs>
           Stocks
         </Col>
         <Col className={classes.maps} xs>
             <div style={{width: '100%', height: '100%'}}>
                <SimpleMap/>
            </div>
         </Col>
        </Row>
        <Row className={classes.row} around="xs">
            <Col className={classes.box} xs>
                News Article 1
            </Col>
        </Row>
        <Row className={classes.row} around="xs">
            <Col className={classes.box} xs>
                News Article 2
            </Col>
        </Row>
        <Row className={classes.row} around="xs">
            <Col className={classes.box} xs>
                News Article 3
            </Col>
        </Row>
    </Grid>
    );
  }
}

export default withRoot(withStyles(styles)(Event))
