import { useEffect, useState, useRef } from 'react';


function ModalComponent () {
    const [data, setData] = useState([]);
    const carousel = useRef(null);
    const [isMOdalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/static/shoes.json')
          .then((response) => response.json())
          .then(setData);
      }, []);

    return (
        <div className="App">
            
            {isMOdalVisible ? <h1>Modal</h1> : null}

        <div className="carousel" ref={carousel}>
            {data.map((item) => {
                const { id,price } = item;
                return (
                    <div className="item2" key={id}>
                        <div className="info">
                            <button className="price" onClick={() => setIsModalVisible(true)}>U$ {price}</button>
                        </div>
                    </div>
                );
            })}
        </div>        
        </div>
    )
}

export default ModalComponent