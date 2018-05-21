import React from 'react'

const TimelineTour = [
  {
    step: 1,
    selector: ".welcome-tour",
    title: <div style={{color: "black"}}>1. Welcome to EventStock!</div>,
    body: <div style={{color: "394b59"}}>To continue the site tour, press "Next". To exit the tour, press "Close".</div>
  },
  {
    step: 2,
    selector: ".browse-tour",
    title: <div style={{color: "black"}}>2. Browse trending events on our timeline</div>,
    body: <div style={{color: "394b59"}}>Find events of interest and click on one to explore it in detail.</div>
  },
  {
    step: 3,
    selector: ".filter-tour",
    title: <div style={{color: "black"}}>3. Filter the timeline by date or category</div>,
    body: <div style={{color: "394b59"}}>You can filter events within a certain date range or category of interest.</div>
  }
]

const EventTour = [
  {
    step: 1,
    selector: ".overview-tour",
    title: <div style={{color: "black"}}>1. Overview of the event</div>,
    body: <div style={{color: "394b59"}}>Here you can see a summary of the event, including its date and a description.</div>
  },
  {
    step: 2,
    selector: ".report-tour",
    title: <div style={{color: "black"}}>2. Report generation and sharing</div>,
    body: <div style={{color: "394b59"}}>You can generate a report of the event for download or share the event on social media.</div>
  },
  {
    step: 3,
    selector: ".company-card-tour",
    title: <div style={{color: "black"}}>3. Company summaries</div>,
    body: <div style={{color: "394b59"}}>You can view overviews for each of the companies affected by the event. Click on the card to see a chart of social interactions.</div>
  },
  {
    step: 4,
    selector: ".stock-chart-tour",
    title: <div style={{color: "black"}}>4. Stock information duing the event</div>,
    body: <div style={{color: "394b59"}}>You can also view the stock price for all affected companies over the event period.</div>
  },
  {
    step: 5,
    selector: ".heat-map-tour",
    title: <div style={{color: "black"}}>5. Global impact heat map</div>,
    body: <div style={{color: "394b59"}}>The global impact of the event can be analysed through the heat map.</div>
  },
  {
    step: 6,
    selector: ".news-articles-tour",
    title: <div style={{color: "black"}}>6. News articles</div>,
    body: <div style={{color: "394b59"}}>News articles relating to the event and companies are listed here to view.</div>
  }
]

export { TimelineTour, EventTour }
