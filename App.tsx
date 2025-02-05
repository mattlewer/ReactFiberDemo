import React from 'react';
import {Suspense, useMemo} from 'react';
import {Canvas, useLoader} from '@react-three/fiber/native';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {useGLTF} from '@react-three/drei/native';
import {Asset} from 'expo-asset';
import * as THREE from 'three';
import modelPath from './assets/tree_gltf.gltf';

// https://github.com/pmndrs/react-three-fiber/issues/3085#issuecomment-1837583297
function A() {
  const buffer = useLoader(THREE.FileLoader, require('./assets/tree_obj.obj'));
  const obj = useMemo(
    () => new OBJLoader().parse(THREE.LoaderUtils.decodeText(buffer)),
    [buffer],
  );
  return <primitive object={obj} scale={10} />;
}

// Likely indicates a deeper regression since the start of the thread
// https://github.com/pmndrs/react-three-fiber/issues/3085#issuecomment-1925877969
function B() {
  const buffer = useLoader(
    THREE.FileLoader,
    Asset.fromModule(require('./assets/tree_obj.obj')).uri,
  );
  const obj = useMemo(
    () => new OBJLoader().parse(THREE.LoaderUtils.decodeText(buffer)),
    [buffer],
  );
  return <primitive object={obj} scale={10} />;
}

// https://docs.pmnd.rs/react-three-fiber/getting-started/installation#react-native
function C(props) {
  const gltf = useGLTF(modelPath);
  return <primitive {...props} object={gltf.scene} />;
}

function App(): React.JSX.Element {
  return (
    <Canvas>
      <ambientLight />
      <Suspense>
        {/* <A/> */}
        {/* <B /> */}
        <C />
      </Suspense>
    </Canvas>
  );
}

export default App;
