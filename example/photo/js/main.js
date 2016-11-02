

const MainApp = React.createClass({
 
  render(){
    return(
      <div id='App'>
        <div id='header'>
          <div className='header_logo'></div>
          <div className='header_menu'>
              <ReactRouter.Link className='header_menu_item' to='/'>Портфолио</ReactRouter.Link>
              <ReactRouter.Link className='header_menu_item' search="wedding" to='/search/'>Услуги и Цены</ReactRouter.Link>
              <ReactRouter.Link className='header_menu_item' search="wedding" to='/search/'>Контакты</ReactRouter.Link>
          </div>
        </div>
        {this.props.children}
      </div>
      )
  }
});
const AlbumCard = React.createClass({
  render(){
    const {
      id,
      title,
      image,
      type,
      link,
      description,
      date,
      tags
    } = this.props;
    const tag = tags.map(item=>
      <ReactRouter.Link className='album_tags_item' to={`/search/${item}`}>{item}</ReactRouter.Link>
      );

    return(
                <div key={id} className="album_item">
                  <ReactRouter.Link to={`/albums/${link}`}>
                            <div className="album_img">
                              <img src={image} alt="work_1" />
                            </div>
                            <div className="album_title">{title}</div>
                            <div className='album_date'>{date}</div>
                            <div className='album_description'>{description}</div>
                            <div className='album_tags'>{tag}</div>
                  </ReactRouter.Link>
                </div>
             
           

      )
  }
});
const Index = React.createClass({


  getInitialState: function(){
    return{
      displayAlbums: this.props.route.data
      };  
  },
 
  componentDidMount: function() {
    var $grid = $('.album_card').masonry({
      // options
      itemSelector: '.album_item',
      gutter: '.gutter-sizer',
      percentPosition: true,
      columnWidth: '.album_sizer'
    }); 
    $grid.imagesLoaded().progress( function() {
      $grid.masonry();
    });           
  },
  render(){
    const albumCardItems = this.state.displayAlbums.map(album=>
        <AlbumCard 
            key={album.id}
            id={album.id}
            title={album.title}
            image={album.title_image}
            type={album.type}
            link={album.link}
            description={album.description}
            date={album.date}
            tags={album.tags}
        />
    ); 
    return(
      <div>
        <div className="album_card">
        <div className="album_card_dop">
          <div className="album_sizer"></div>
          <div className="gutter-sizer"></div>
          {albumCardItems}
        
        </div>
        </div>
      </div>
      )
  }
});

const Wrapper = React.createClass({
  AlbumFilter: function(){
    const location = this.props.params.albums;
    
    const filterAlbums = this.props.route.data.filter(album =>{
    
    const searchString = album.link;
    
    return searchString.indexOf(location) !== -1;
    });
    
  return filterAlbums;
  },
  getInitialState: function(){
    var data = [];
    data = this.AlbumFilter();
    console.log(data);
    return{
      thisAlbum: data
      };    
  },
  Photo: function() {
    var AlbumImage = []
    
    for (var i = 1; i <= this.state.thisAlbum[0].image; i++) {
      
      AlbumImage.push(<img src={`img/${this.state.thisAlbum[0].link}/${i}.jpg`} itemprop="thumbnail"  alt=""/>);
    };    
        return  AlbumImage;
    
  },
  render(){
    return(
      <div className="thisalbum">
        <div className="thisalbum_title">
          {this.state.thisAlbum[0].description}
        </div>
        <div className="thisalbum_photo">
          {this.Photo()}
        </div>
      </div>
      )
  }
});


const Search = React.createClass({
    AlbumFilter: function(){
    console.log(this.props)
    const location = this.props.params.search;
    
    const filterAlbums = this.props.route.data.filter(album =>{
    
    const searchString = album.tags.join();
    console.log(searchString)
    return searchString.indexOf(location) !== -1;
    });
    console.log(filterAlbums)
  return filterAlbums;
  },
  getInitialState: function(){
    var data = [];
    data = this.AlbumFilter();
    console.log(data);
    return{
      displayAlbums: data
      };    
  },
  componentDidMount: function() {
    var $grid = $('.album_card').masonry({
      // options
      itemSelector: '.album_item',
      gutter: '.gutter-sizer',
      percentPosition: true,
      columnWidth: '.album_sizer'
    }); 
    $grid.imagesLoaded().progress( function() {
      $grid.masonry();
    });           
  },
  render(){
    const albumCardItems = this.state.displayAlbums.map(album=>
        <AlbumCard 
            key={album.id}
            id={album.id}
            title={album.title}
            image={album.title_image}
            type={album.type}
            link={album.link}
            description={album.description}
            date={album.date}
            tags={album.tags}
        />
    ); 
    return(
      <div>
        <div className="search_title">Поиск по тегу: {this.props.params.search}<span className="search_exit"><ReactRouter.Link to='/'> [закрыть]</ReactRouter.Link></span></div>
        <div className="album_card">
          <div className="album_sizer"></div>
          <div className="gutter-sizer"></div>
          {albumCardItems}
        
        </div>
      </div>
      )
  }
});

  
$.getJSON('data.json', function(data){
  console.log(data)
  ReactDOM.render((
      <ReactRouter.Router>
          <ReactRouter.Route  path='/'  component={MainApp}>
            <ReactRouter.IndexRoute data={data} component={Index} />
            <ReactRouter.Route path='/albums/:albums' data={data} component={Wrapper} />
            <ReactRouter.Route path='/search/:search' data={data} component={Search} />
          </ReactRouter.Route>
        </ReactRouter.Router>
    ), document.getElementById('app')
  );
});