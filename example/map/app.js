var MARKER=[];

var myMap,
	emi;
var hello="ewr";	






const SaleCard = React.createClass({
	render(){
		const{
			id,
			title,
			description,
			img
		} = this.props;

		return(
			<div className="sale-card">
				{title}
				<img className="sale-img" src={img} />
				{description}
			</div>
		);
	}
});

const SearchBar = React.createClass({
    render() {
        return (
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Look for a hotel"
                    onChange={this.props.onSearch}
                />
            </div>
        );
    }
});


const MapBox = React.createClass({
	getInitialState() {
		return {
			displayMarkers: MARKER
		}
	},

	mapsReady: function(){
		ymaps.ready(this.init);
    		
	},

	init: function() {
					
			console.log("init");
			// console.log(privet);
			
			myMap = new ymaps.Map('map', {
		            center: [55.76, 37.64],
		            zoom: 10,
		            controls: []
		        }, {
		            searchControlProvider: 'yandex#search',
		            suppressMapOpenBlock: true
		        }),
		    	emi = new ymaps.ObjectManager({
		            // Чтобы метки начали кластеризоваться, выставляем опцию.
		            clusterize: true,
		            // ObjectManager принимает те же опции, что и кластеризатор.
		            gridSize: 32,
		            geoObjectOpenBalloonOnClick: false
				});
			
		   
			emi.objects.options.set('preset', 'islands#greenDotIcon');
			emi.clusters.options.set('preset', 'islands#greenClusterIcons');
			
			

			
			
			
			
			this.addGeoObjects();
	},

	newInit: function() {

	},

	addGeoObjects: function() {
		var markers = this.state.displayMarkers;
		emi.add(markers);
		console.log(emi);
		myMap.geoObjects.add(emi);
	},

	componentWillMount: function() {
      	
	},

	componentDidMount: function() {
    // компонент уже находится в DOM
    // здесь можно уже взаимодействовать с DOM напрямую
    // например, использовать jQuery или какие-то сторонние библиотеки
    	this.mapsReady();

		        
	},

	componentDidUpdate: function(prevProps, prevState) {
	    // в prevProps содержится объект с предыдущими параметрами
	    // в prevState содержится объект с состоянием до изменения
	    // измененные параметры и состояние могут быть получены через this.props и this.state
	   console.log("new init"); 
	   console.log(prevProps);
	    
	  // this.init();

		// myMap.geoObjects.removeAll(); 
		// this.addGeoObjects();
	},

	handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        
        const lalala = MARKER.features;
        const features = lalala.filter(item => {
            
            const searchString = item.content.title.toLowerCase();
            
            return searchString.indexOf(searchQuery) !== -1;
        });
        if (lalala==features) {
        	console.log('true');
        }
        else console.log('false');
        emi.setFilter(function(object){
            	
				return object.content.title.indexOf(searchQuery) !== -1;
			});
        
        const displayMarkers = {"type": "FeatureCollection", features};
        

        this.setState({
            displayMarkers

        });
    },

	render() {

		const saleCard = this.state.displayMarkers.features.map(item =>
			<SaleCard
				key={item.id}
				id={item.id}
				title={item.content.title}
				description={item.content.description}
				img={item.img}
			/>
		);

		var privet = "Привет";

		
			

		return (
			
				<div className="mapBox">
					<div className="header">SIbay</div>
					<SearchBar onSearch={this.handleSearch} />
					<div className="sale-list">
	                    {saleCard}
	                </div>

				</div>
				
			
			);
	}
});

$.getJSON("data.json", function(data) {

	MARKER = data
	console.log("данные пришли");
	ReactDOM.render(
	  <MapBox hello={hello} name="Azat" />,
	  document.getElementById('content')
	);
});