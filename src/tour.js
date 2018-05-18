import React from 'react'

const TimelineTour = [
  {
    step: 1,
    selector: ".welcome",
    title: <div style={{color: "black"}}>1. Welcome to EventStock!</div>,
    body: <div style={{color: "394b59"}}>To continue the tour of the site, press "Next". To exit the tour, press "Close".</div>
  },
  {
    step: 2,
    selector: ".browse",
    title: <div style={{color: "black"}}>2. Browse trending events on our timeline</div>,
    body: <div style={{color: "394b59"}}>Find events of interest and click on them to learn more.</div>
  },
  {
    step: 3,
    selector: ".filter-date",
    title: <div style={{color: "black"}}>3. Filter the timeline by date</div>,
    body: <div style={{color: "394b59"}}>You can also find events within a certain date range of interest.</div>
  },
  {
    step: 4,
    selector: ".filter-category",
    title: <div style={{color: "black"}}>4. Filter the timeline by category</div>,
    body: <div style={{color: "394b59"}}>You can also find more relevant events by selecting categories of interest.</div>
  }
]

const EventTour = [
  {
    step: 1,
    selector: ".overview",
    title: <div style={{color: "black"}}>1. Overview of the event</div>,
    body: <div style={{color: "394b59"}}>Here you can see a summary of the event including its date and a description.</div>
  },
  {
    step: 2,
    selector: ".report",
    title: <div style={{color: "black"}}>2. Report generation</div>,
    body: <div style={{color: "394b59"}}>You can generate a summary report of the event for download as a PDF.</div>
  },
  {
    step: 3,
    selector: ".company-card",
    title: <div style={{color: "black"}}>3. Company summaries</div>,
    body: <div style={{color: "394b59"}}>You can view an overview of companies affected by the event. Click on the card for more information and a chart of social interactions.</div>
  },
  {
    step: 4,
    selector: ".stock-chart",
    title: <div style={{color: "black"}}>4. Stock information duing the event</div>,
    body: <div style={{color: "394b59"}}>You cna also view the stock price for all affected companies over the period of the event.</div>
  },
  {
    step: 5,
    selector: ".heat-map",
    title: <div style={{color: "black"}}>5. Global impact heat map</div>,
    body: <div style={{color: "394b59"}}>The global impact of the event can be analysed through this heat map.</div>
  },
  {
    step: 6,
    selector: ".news-articles",
    title: <div style={{color: "black"}}>6. News articles</div>,
    body: <div style={{color: "394b59"}}>A range of news articles relating to the event and companies are available for viewing.</div>
  },
]

export { TimelineTour, EventTour }
