import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'
import Typography from 'material-ui/Typography'
import _ from 'lodash'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #26c6da, #00acc1)'
  }
})

class Company extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    infoJSON: PropTypes.object,
  }


  render () {
    const { name, loading, infoJSON } = this.props
    const { classes } = this.props
    console.log(infoJSON)
    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader title={name} className={classes.cardHeader}/>
          <CardContent>
            {infoJSON ?
            (
              <Typography>
                <b>{infoJSON[name]}</b>
                Company Class: {infoJSON[category]}
                Website: {infoJSON[website]}


              </Typography>
            ):
              <i> No information can be retrieved for this company at this point in time. We apologise for any inconvenience. </i>
            }
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(Company))


// {infoJSON ?
//     {_.map(_.keys(infoJSON), (key, i) =>
//     key !== 'description' && key !== 'id'?
//       (<Typography color="inherit" key={i}>
//         <b>{key}: </b> {infoJSON[key]}
//       </Typography>)
//       : null
//   )}
// :
//   No information can be retrieved for this company at this point in time. We apologise for any inconvenience.
// }
