import mockery from 'mockery';
import m from 'module';

global.__DEV__ = true;

mockery.enable();
mockery.warnOnUnregistered(false);

// Mock all images for React Native
const originalLoader = m._load;
m._load = (request, parent, isMain) => {
  if (request.match(/.jpeg|.jpg|.png|.gif$/)) {
    return { uri: request };
  }

  return originalLoader(request, parent, isMain);
};
