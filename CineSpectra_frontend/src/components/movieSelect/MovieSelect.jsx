import React, { useEffect, useState } from 'react';
import { fetchMovieList } from '../../utils/combineApiData';
// import VirtualizedSelect from 'react-virtualized-select';
import  Select from 'react-select';
// import 'react-select/dist/react-select.css'
// import 'react-virtualized/styles.css'
// import 'react-virtualized-select/styles.css'
import './styles.scss';
import { FixedSizeList as List } from 'react-window';
import { useNavigate } from 'react-router-dom';

const VirtualizedMenuList = ({ children, maxHeight }) => {
    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={40} // Adjust item size as needed
        width={'100%'}
      >
        {({ index, style }) => (
          <div style={style}>
            {children[index]}
          </div>
        )}
      </List>
    );
};

const VirtualizedMovieSelect = ({ maxHeight }) => {
    
    const navigate = useNavigate();

    const [movieOptions, setOptions] = useState(null);
    const [movie, setMovie] = useState(null);
    const [movieId, setMovieId] = useState(null); 
    const [loading, setLoading] = useState(false);

    let id = {};
    const onChange = (selectedItem, action) => {
        setMovie(selectedItem);
        setMovieId(selectedItem.value);
        console.log(selectedItem);
        // if(action.action !== 'clear') {
        //     id.sort_by =
        // }
    }
    useEffect(() => {
        const fetchList = async () => {
            try {
                setLoading(true);
                const { options }= await fetchMovieList();
                setOptions(options);
                console.log(options);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie list:', error);
            }
        };
        id = {};
        fetchList();
        
    }, []);

    // const options = movieOptions;

    // const height = Math.min(options.length * 35, maxHeight); 
    
    return (
        <div className="search">
            {movieOptions && <>
                <Select
                options={movieOptions}
                components={{ MenuList: VirtualizedMenuList}}
                name="search"
                value={movie}
                isClearable={true}
                placeholder="Enter a Movie..."
                classNamePrefix='react-select'
                className='react-select-container sortbyDD'
                menuIsVirtual={true}
                // menuIsOpen={true}
                onChange={onChange}
                maxMenuHeight={200}
            />
            <button onClick={() => navigate(`/recommend-movies/${movieId}`)}>Recommend</button>
            </>}
            
            

        </div>
      )
}

export default VirtualizedMovieSelect