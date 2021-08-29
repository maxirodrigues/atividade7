import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Button, Image, Text, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from 'react-native-axios';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text'

const Editar = () => {


  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState();
  const [img, setImg] = useState('');
  const [id, setId] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {

    const product = route.params.product;

    setCodigo(product.codigo);
    setDescricao(product.descricao);
    setCategoria(product.categoria);
    setPreco(product.preco.toString());
    setImg(product.img);
    setId(product.id);
  }, [])

  const saveProduct = () => {

    if (codigo.trim() === "") {
      alert("O código não pode estar vazio")
    } else {
      Axios.patch('http://10.0.2.2:3000/products/' + id, {
        codigo,
        descricao,
        categoria,
        preco,
        img
      }).then((res) => {
        alert("Salvo com sucesso!")
        navigation.navigate('Home', { res })
      }).catch(() => alert("Erro ao salvar"))
    }


  }

  const deleteProduct = () => {

    Axios.delete('http://10.0.2.2:3000/products/' + id).then((res) => {
      alert("Deletado com sucesso!")
      navigation.navigate('Home', { res })
    }).catch(() => alert("Erro ao salvar"))

  }

  useEffect(() => { }, []);


  const handlePickerImage = () => {
        ImagePicker.openPicker({
          width: 100,
          height: 100,
          cropping: true,
        }).then(res => {
          setImg(res.path);
        });
      };

  return (
    <View style={{ padding: 20, alignItems: "center", flex: 0.8}}>
      <Image source={{ uri: img ? img : null }} 
        style={
                { 
                  width: 100, 
                  height: 100, 
                  borderRadius: 50, 
                  borderColor: '#545454', 
                  borderWidth: 1 
                }
              } />

      <TouchableOpacity onPress={handlePickerImage}>
        <Text>Carregar imagem</Text>
      </TouchableOpacity>

      <TextInput
        value={codigo}
        onChangeText={(txt) => setCodigo(txt)}
        autoCapitalize='characters'
        placeholder="Código"
        style={
                { fontSize: 16,
                  marginTop: 10, 
                  borderWidth: 1, 
                  width: '100%', 
                  height: 50, 
                  borderRadius: 10, 
                  padding: 10,
                }}
        placeholderTextColor="#5a5a5a" />
      <TextInput 
        value={descricao} 
        onChangeText={(txt) => setDescricao(txt)} 
        placeholder="Descrição" 
        style={
                {
                  textAlign: 'justify',
                  fontSize: 16, 
                  marginTop: 10, 
                  borderWidth: 1, 
                  width: '100%', 
                  padding: 10, 
                  borderRadius: 7
                }
              } 
                 placeholderTextColor="#5a5a5a" 
                 multiline={true}
                 numberOfLines={2}
      />
      <RNPickerSelect
            value={categoria}
            onValueChange={(value) => setCategoria(value)}
            items={[
                { label: 'Telefonia', value: 'Telefonia' },
                { label: 'Informática', value: 'Informática' },
                { label: 'Eletrodomésticos', value: 'Eletrodomésticos' },
                { label: 'Eletroportáteis', value: 'Eletroportáteis' },
                { label: 'Automotivo', value: 'Automotivo' },
                { label: 'TVs e Áudio', value: 'TVs e Áudio' },
            ]}
            useNativeAndroidPickerStyle={false}
            style={
                    { inputAndroid: 
                      { fontSize: 16,
                        marginTop: 10,
                        borderWidth: 1, 
                        width: 322, 
                        height: 50, 
                        padding: 10,
                        borderRadius: 7 }
                    }
                  }
            placeholder={{
              label: 'Selecione uma Categoria',
              value: null,
              color: 'red',
            }}
        />
      <TextInputMask
          type={'money'}
          options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          suffixUnit: ''
          }}
          value={preco}
          onChangeText={(txt) => setPreco(txt)}
          placeholder="Preço" 
          style={{ 
                    fontSize: 16, 
                    marginTop: 10, 
                    borderWidth: 1, 
                    width: '100%',
                    height: 50, 
                    padding: 10, 
                    borderRadius: 7,
                    marginBottom: 30,
                  }}
          placeholderTextColor="#5a5a5a"
/>
    <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={saveProduct} 
          style= {{backgroundColor: 'blue',
                width: '30%',
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 50
              }}>
          <Text style={{color:'#fff'}}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteProduct} 
          style= {{backgroundColor: 'red',
                width: '30%',
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}>
          <Text style={{color:'#fff'}}>DELETAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Editar;