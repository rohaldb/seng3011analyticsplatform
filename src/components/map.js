import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'
import AmCharts from '@amcharts/amcharts3-react'
import 'ammap3/ammap/ammap.js'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #ef5350, #e53935)'
  }
})

class Map extends React.Component {

  render () {
    const { classes } = this.props

    var mapData = [
{'id': 'AF', 'name': 'Afghanistan', 'value': 32358260},
{'id': 'AL', 'name': 'Albania', 'value': 3215988},
{'id': 'DZ', 'name': 'Algeria', 'value': 35980193},
{'id': 'AO', 'name': 'Angola', 'value': 19618432},
{'id': 'AR', 'name': 'Argentina', 'value': 40764561},
{'id': 'AM', 'name': 'Armenia', 'value': 3100236},
{'id': 'AU', 'name': 'Australia', 'value': 22605732},
{'id': 'AT', 'name': 'Austria', 'value': 8413429},
{'id': 'AZ', 'name': 'Azerbaijan', 'value': 9306023},
{'id': 'BH', 'name': 'Bahrain', 'value': 1323535},
{'id': 'BD', 'name': 'Bangladesh', 'value': 150493658},
{'id': 'BY', 'name': 'Belarus', 'value': 9559441},
{'id': 'BE', 'name': 'Belgium', 'value': 10754056},
{'id': 'BJ', 'name': 'Benin', 'value': 9099922},
{'id': 'BT', 'name': 'Bhutan', 'value': 738267},
{'id': 'BO', 'name': 'Bolivia', 'value': 10088108},
{'id': 'BA', 'name': 'Bosnia and Herzegovina', 'value': 3752228},
{'id': 'BW', 'name': 'Botswana', 'value': 2030738},
{'id': 'BR', 'name': 'Brazil', 'value': 196655014},
{'id': 'BN', 'name': 'Brunei', 'value': 405938},
{'id': 'BG', 'name': 'Bulgaria', 'value': 7446135},
{'id': 'BF', 'name': 'Burkina Faso', 'value': 16967845},
{'id': 'BI', 'name': 'Burundi', 'value': 8575172},
{'id': 'KH', 'name': 'Cambodia', 'value': 14305183},
{'id': 'CM', 'name': 'Cameroon', 'value': 20030362},
{'id': 'CA', 'name': 'Canada', 'value': 34349561},
{'id': 'CV', 'name': 'Cape Verde', 'value': 500585},
{'id': 'CF', 'name': 'Central African Rep.', 'value': 4486837},
{'id': 'TD', 'name': 'Chad', 'value': 11525496},
{'id': 'CL', 'name': 'Chile', 'value': 17269525},
{'id': 'CN', 'name': 'China', 'value': 1347565324},
{'id': 'CO', 'name': 'Colombia', 'value': 46927125},
{'id': 'KM', 'name': 'Comoros', 'value': 753943},
{'id': 'CD', 'name': 'Congo, Dem. Rep.', 'value': 67757577},
{'id': 'CG', 'name': 'Congo, Rep.', 'value': 4139748},
{'id': 'CR', 'name': 'Costa Rica', 'value': 4726575},
{'id': 'CI', 'name': "Cote d'Ivoire", 'value': 20152894},
{'id': 'HR', 'name': 'Croatia', 'value': 4395560},
{'id': 'CU', 'name': 'Cuba', 'value': 11253665},
{'id': 'CY', 'name': 'Cyprus', 'value': 1116564},
{'id': 'CZ', 'name': 'Czech Rep.', 'value': 10534293},
{'id': 'DK', 'name': 'Denmark', 'value': 5572594},
{'id': 'DJ', 'name': 'Djibouti', 'value': 905564},
{'id': 'DO', 'name': 'Dominican Rep.', 'value': 10056181},
{'id': 'EC', 'name': 'Ecuador', 'value': 14666055},
{'id': 'EG', 'name': 'Egypt', 'value': 82536770},
{'id': 'SV', 'name': 'El Salvador', 'value': 6227491},
{'id': 'GQ', 'name': 'Equatorial Guinea', 'value': 720213},
{'id': 'ER', 'name': 'Eritrea', 'value': 5415280},
{'id': 'EE', 'name': 'Estonia', 'value': 1340537},
{'id': 'ET', 'name': 'Ethiopia', 'value': 84734262},
{'id': 'FJ', 'name': 'Fiji', 'value': 868406},
{'id': 'FI', 'name': 'Finland', 'value': 5384770},
{'id': 'FR', 'name': 'France', 'value': 63125894},
{'id': 'GA', 'name': 'Gabon', 'value': 1534262},
{'id': 'GM', 'name': 'Gambia', 'value': 1776103},
{'id': 'GE', 'name': 'Georgia', 'value': 4329026},
{'id': 'DE', 'name': 'Germany', 'value': 82162512},
{'id': 'GH', 'name': 'Ghana', 'value': 24965816},
{'id': 'GR', 'name': 'Greece', 'value': 11390031},
{'id': 'GT', 'name': 'Guatemala', 'value': 14757316},
{'id': 'GN', 'name': 'Guinea', 'value': 10221808},
{'id': 'GW', 'name': 'Guinea-Bissau', 'value': 1547061},
{'id': 'GY', 'name': 'Guyana', 'value': 756040},
{'id': 'HT', 'name': 'Haiti', 'value': 10123787},
{'id': 'HN', 'name': 'Honduras', 'value': 7754687},
{'id': 'HK', 'name': 'Hong Kong, China', 'value': 7122187},
{'id': 'HU', 'name': 'Hungary', 'value': 9966116},
{'id': 'IS', 'name': 'Iceland', 'value': 324366},
{'id': 'IN', 'name': 'India', 'value': 1241491960},
{'id': 'ID', 'name': 'Indonesia', 'value': 242325638},
{'id': 'IR', 'name': 'Iran', 'value': 74798599},
{'id': 'IQ', 'name': 'Iraq', 'value': 32664942},
{'id': 'IE', 'name': 'Ireland', 'value': 4525802},
{'id': 'IL', 'name': 'Israel', 'value': 7562194},
{'id': 'IT', 'name': 'Italy', 'value': 60788694},
{'id': 'JM', 'name': 'Jamaica', 'value': 2751273},
{'id': 'JP', 'name': 'Japan', 'value': 126497241},
{'id': 'JO', 'name': 'Jordan', 'value': 6330169},
{'id': 'KZ', 'name': 'Kazakhstan', 'value': 16206750},
{'id': 'KE', 'name': 'Kenya', 'value': 41609728},
{'id': 'KP', 'name': 'Korea, Dem. Rep.', 'value': 24451285},
{'id': 'KR', 'name': 'Korea, Rep.', 'value': 48391343},
{'id': 'KW', 'name': 'Kuwait', 'value': 2818042},
{'id': 'KG', 'name': 'Kyrgyzstan', 'value': 5392580},
{'id': 'LA', 'name': 'Laos', 'value': 6288037},
{'id': 'LV', 'name': 'Latvia', 'value': 2243142},
{'id': 'LB', 'name': 'Lebanon', 'value': 4259405},
{'id': 'LS', 'name': 'Lesotho', 'value': 2193843},
{'id': 'LR', 'name': 'Liberia', 'value': 4128572},
{'id': 'LY', 'name': 'Libya', 'value': 6422772},
{'id': 'LT', 'name': 'Lithuania', 'value': 3307481},
{'id': 'LU', 'name': 'Luxembourg', 'value': 515941},
{'id': 'MK', 'name': 'Macedonia, FYR', 'value': 2063893},
{'id': 'MG', 'name': 'Madagascar', 'value': 21315135},
{'id': 'MW', 'name': 'Malawi', 'value': 15380888},
{'id': 'MY', 'name': 'Malaysia', 'value': 28859154},
{'id': 'ML', 'name': 'Mali', 'value': 15839538},
{'id': 'MR', 'name': 'Mauritania', 'value': 3541540},
{'id': 'MU', 'name': 'Mauritius', 'value': 1306593},
{'id': 'MX', 'name': 'Mexico', 'value': 114793341},
{'id': 'MD', 'name': 'Moldova', 'value': 3544864},
{'id': 'MN', 'name': 'Mongolia', 'value': 2800114},
{'id': 'ME', 'name': 'Montenegro', 'value': 632261},
{'id': 'MA', 'name': 'Morocco', 'value': 32272974},
{'id': 'MZ', 'name': 'Mozambique', 'value': 23929708},
{'id': 'MM', 'name': 'Myanmar', 'value': 48336763},
{'id': 'NA', 'name': 'Namibia', 'value': 2324004},
{'id': 'NP', 'name': 'Nepal', 'value': 30485798},
{'id': 'NL', 'name': 'Netherlands', 'value': 16664746},
{'id': 'NZ', 'name': 'New Zealand', 'value': 4414509},
{'id': 'NI', 'name': 'Nicaragua', 'value': 5869859},
{'id': 'NE', 'name': 'Niger', 'value': 16068994},
{'id': 'NG', 'name': 'Nigeria', 'value': 162470737},
{'id': 'NO', 'name': 'Norway', 'value': 4924848},
{'id': 'OM', 'name': 'Oman', 'value': 2846145},
{'id': 'PK', 'name': 'Pakistan', 'value': 176745364},
{'id': 'PA', 'name': 'Panama', 'value': 3571185},
{'id': 'PG', 'name': 'Papua New Guinea', 'value': 7013829},
{'id': 'PY', 'name': 'Paraguay', 'value': 6568290},
{'id': 'PE', 'name': 'Peru', 'value': 29399817},
{'id': 'PH', 'name': 'Philippines', 'value': 94852030},
{'id': 'PL', 'name': 'Poland', 'value': 38298949},
{'id': 'PT', 'name': 'Portugal', 'value': 10689663},
{'id': 'PR', 'name': 'Puerto Rico', 'value': 3745526},
{'id': 'QA', 'name': 'Qatar', 'value': 1870041},
{'id': 'RO', 'name': 'Romania', 'value': 21436495},
{'id': 'RU', 'name': 'Russia', 'value': 142835555},
{'id': 'RW', 'name': 'Rwanda', 'value': 10942950},
{'id': 'SA', 'name': 'Saudi Arabia', 'value': 28082541},
{'id': 'SN', 'name': 'Senegal', 'value': 12767556},
{'id': 'RS', 'name': 'Serbia', 'value': 9853969},
{'id': 'SL', 'name': 'Sierra Leone', 'value': 5997486},
{'id': 'SG', 'name': 'Singapore', 'value': 5187933},
{'id': 'SK', 'name': 'Slovak Republic', 'value': 5471502},
{'id': 'SI', 'name': 'Slovenia', 'value': 2035012},
{'id': 'SB', 'name': 'Solomon Islands', 'value': 552267},
{'id': 'SO', 'name': 'Somalia', 'value': 9556873},
{'id': 'ZA', 'name': 'South Africa', 'value': 50459978},
{'id': 'ES', 'name': 'Spain', 'value': 46454895},
{'id': 'LK', 'name': 'Sri Lanka', 'value': 21045394},
{'id': 'SD', 'name': 'Sudan', 'value': 34735288},
{'id': 'SR', 'name': 'Suriname', 'value': 529419},
{'id': 'SZ', 'name': 'Swaziland', 'value': 1203330},
{'id': 'SE', 'name': 'Sweden', 'value': 9440747},
{'id': 'CH', 'name': 'Switzerland', 'value': 7701690},
{'id': 'SY', 'name': 'Syria', 'value': 20766037},
{'id': 'TW', 'name': 'Taiwan', 'value': 23072000},
{'id': 'TJ', 'name': 'Tajikistan', 'value': 6976958},
{'id': 'TZ', 'name': 'Tanzania', 'value': 46218486},
{'id': 'TH', 'name': 'Thailand', 'value': 69518555},
{'id': 'TG', 'name': 'Togo', 'value': 6154813},
{'id': 'TT', 'name': 'Trinidad and Tobago', 'value': 1346350},
{'id': 'TN', 'name': 'Tunisia', 'value': 10594057},
{'id': 'TR', 'name': 'Turkey', 'value': 73639596},
{'id': 'TM', 'name': 'Turkmenistan', 'value': 5105301},
{'id': 'UG', 'name': 'Uganda', 'value': 34509205},
{'id': 'UA', 'name': 'Ukraine', 'value': 45190180},
{'id': 'AE', 'name': 'United Arab Emirates', 'value': 7890924},
{'id': 'GB', 'name': 'United Kingdom', 'value': 62417431},
{'id': 'US', 'name': 'United States', 'value': 313085380},
{'id': 'UY', 'name': 'Uruguay', 'value': 3380008},
{'id': 'UZ', 'name': 'Uzbekistan', 'value': 27760267},
{'id': 'VE', 'name': 'Venezuela', 'value': 29436891},
{'id': 'PS', 'name': 'West Bank and Gaza', 'value': 4152369},
{'id': 'VN', 'name': 'Vietnam', 'value': 88791996},
{'id': 'YE', 'name': 'Yemen, Rep.', 'value': 24799880},
{'id': 'ZM', 'name': 'Zambia', 'value': 13474959},
{'id': 'ZW', 'name': 'Zimbabwe', 'value': 12754378}]

    // config as same as yours but inside const
    const config = {
      'type': 'map',
      'theme': 'light',
      'colorSteps': 10,
      'dataProvider': {
        'map': 'worldLow',
        'areas': mapData
      },
      'areasSettings': {
        'autoZoom': true
      },
      'valueLegend': {
        'right': 10,
        'minValue': 'little',
        'maxValue': 'a lot!'
      },
      'listeners': [{
        'event': 'descriptionClosed',
        'method': function (ev) {
          ev.chart.selectObject()
        }
      }]
    }

    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader
            title='Global Impact: Articles on Companies'
            className={classes.cardHeader}
          />
          <CardContent className={classes.map}>
            <AmCharts.React style={{width: '100%', height: '500px'}} options={config} />
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(Map))
