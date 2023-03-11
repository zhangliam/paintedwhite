import { injectElements } from '@ergat3/core'
import { changeAction, createActions } from './modelaction'
import * as THREE from 'three'

export const hook = (target, evt, params) => {
  switch (evt) {
    case 'ready':
      if (target.computedItem.value.type == 'Renderer') {
        target.instance.outputEncoding = THREE.sRGBEncoding;
        target.instance.shadowMap.enabled = true;
      }
      break
    case 'load':
      if (target.computedItem.value.type == 'GltfModel') {
        if (params.animations.length) {
          let model = params.scene;
          let mixer = new THREE.AnimationMixer(model);

          let actionNames = []
          let actions = []
          let actionsMap = {}
          params.animations.forEach((animation) => {
            actionNames.push(animation.name)
            let clipAction = mixer.clipAction( animation )
            actions.push(clipAction)
            actionsMap[animation.name] = clipAction
          })

          createActions(target.computedID.value, actionsMap)
          changeAction(target.computedID.value, actionNames[0])

          let clock = new THREE.Clock();
          Object.values(target[injectElements]).some((renderer) => {
            if (renderer.computedItem && renderer.computedItem.type == 'Renderer') {
              renderer.onBeforeRender(() => {
                mixer.update(clock.getDelta());
              });

              Object.values(target[injectElements]).some((scene) => {
                if (scene.computedItem && scene.computedItem.type == 'Scene') {
                  let skeleton = new THREE.SkeletonHelper( model );
                  scene.add( skeleton );
                  return true
                }
                return false
              })
              return true
            }
            return false
          })
          
          window.parent.postMessage({
            command: 'MODEL_ACTIONS',
            data: {
              target: target.computedID.value,
              actions: actionNames
            }
          }, '*')
        }
        
      }
      break
  }
}