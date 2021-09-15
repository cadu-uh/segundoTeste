import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
    //get síncrono com o uso do fetch
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            //console.log('sucesso');
            response.json().then(function(result){ 
              jsonState(result)

              });
          } else {
            throw new Error('Erro ao consumir a API!');
          }
      })
      .then(response => {
        //console.debug(response);
      }).catch(error => {
        console.error(error);
      });
  }

const ShowDetalhes = ({display,toogleModal,mensagem}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{mensagem}</Text>
                </Pressable>
          </View>
        </View>
    </Modal>  
 )

const Album = ({title,urlImg,linkImg}) => {
    
    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={urlImg}/>
      
      <Pressable onPress={mudaModal}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: linkImg,
          }}
        />

        <Text style={styles.paragraph}>{title}</Text>
      </Pressable>
    </View>
    )
}

const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.textHeader}>
           The Best Photos of 2021
        </Text>
      </View>
    );
  };

export default function App() {

  const [jsonData,setJsonData] = React.useState({})

  executeGet("https://jsonplaceholder.typicode.com/photos",setJsonData)

  //função que renderiza cada item do FlatList
  function meuItem({item}){
    
    return(
      <Album title = {item.title}
             urlImg = {item.url}
             linkImg = {item.thumbnailUrl}
      />
    )
  }
  

  return (
    
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#DCDCDC',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'serif' ,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#836FFF',
    borderRadius: 15
  },
  tinyLogo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    borderRadius: 2
  },
   headerStyle: {
    width: '100%',
    height: 45,
    backgroundColor: 'black'
   },
   textHeader: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
