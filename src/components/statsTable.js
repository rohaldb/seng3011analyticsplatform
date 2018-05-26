import React from 'react'
import _ from 'lodash'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #ab47bc , #790e8b)'
  }
})

class StatsTable extends React.Component {
  render () {
    const {eventData, classes} = this.props

    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader
            title='Company Statistics'
            className={classes.cardHeader}
          />
          <CardContent className={classes.map}>
            <div id="stats-table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell numeric>News article mentions</TableCell>
                    <TableCell numeric>Min stock price</TableCell>
                    <TableCell numeric>Max stock price</TableCell>
                    <TableCell numeric>Initial stock price</TableCell>
                    <TableCell numeric>Final stock price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_.map(_.keys(eventData.related_companies), (c, i) => {
                    const {numMentions, min, max, stockStart, stockEnd} = this.props.getCompanySummaryStats(c)

                    return (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {c}
                        </TableCell>
                        <TableCell numeric>{numMentions}</TableCell>
                        <TableCell numeric>{'$' + min}</TableCell>
                        <TableCell numeric>{'$' + max}</TableCell>
                        <TableCell numeric>{'$' + stockStart}</TableCell>
                        <TableCell numeric>{'$' + stockEnd}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(StatsTable))
