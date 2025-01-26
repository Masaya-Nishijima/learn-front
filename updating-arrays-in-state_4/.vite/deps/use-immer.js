import {
  __toESM,
  require_react
} from "./chunk-UTEJFLXC.js";

// node_modules/immer/dist/immer.module.js
function generatePatches(state, basepath, patches, inversePatches, baseValue, resultValue) {
  if (patches) if (Array.isArray(baseValue)) generateArrayPatches(state, basepath, patches, inversePatches, baseValue, resultValue);
  else generateObjectPatches(state, basepath, patches, inversePatches, baseValue, resultValue);
}
function generateArrayPatches(state, basepath, patches, inversePatches, baseValue, resultValue) {
  var shared = Math.min(baseValue.length, resultValue.length);
  for (var i2 = 0; i2 < shared; i2++) {
    if (state.assigned[i2] && baseValue[i2] !== resultValue[i2]) {
      var path = basepath.concat(i2);
      patches.push({ op: "replace", path, value: resultValue[i2] });
      inversePatches.push({ op: "replace", path, value: baseValue[i2] });
    }
  }
  if (shared < resultValue.length) {
    for (var _i = shared; _i < resultValue.length; _i++) {
      var _path = basepath.concat(_i);
      patches.push({ op: "add", path: _path, value: resultValue[_i] });
    }
    inversePatches.push({
      op: "replace",
      path: basepath.concat("length"),
      value: baseValue.length
    });
  } else if (shared < baseValue.length) {
    patches.push({
      op: "replace",
      path: basepath.concat("length"),
      value: resultValue.length
    });
    for (var _i2 = shared; _i2 < baseValue.length; _i2++) {
      var _path2 = basepath.concat(_i2);
      inversePatches.push({ op: "add", path: _path2, value: baseValue[_i2] });
    }
  }
}
function generateObjectPatches(state, basepath, patches, inversePatches, baseValue, resultValue) {
  each(state.assigned, function(key, assignedValue) {
    var origValue = baseValue[key];
    var value = resultValue[key];
    var op = !assignedValue ? "remove" : key in baseValue ? "replace" : "add";
    if (origValue === baseValue && op === "replace") return;
    var path = basepath.concat(key);
    patches.push(op === "remove" ? { op, path } : { op, path, value });
    inversePatches.push(op === "add" ? { op: "remove", path } : op === "remove" ? { op: "add", path, value: origValue } : { op: "replace", path, value: origValue });
  });
}
function applyPatches(draft, patches) {
  var _loop = function _loop2(i3) {
    var patch = patches[i3];
    if (patch.path.length === 0 && patch.op === "replace") {
      draft = patch.value;
    } else {
      var path = patch.path.slice();
      var key = path.pop();
      var base = path.reduce(function(current, part) {
        if (!current) throw new Error("Cannot apply patch, path doesn't resolve: " + patch.path.join("/"));
        return current[part];
      }, draft);
      if (!base) throw new Error("Cannot apply patch, path doesn't resolve: " + patch.path.join("/"));
      switch (patch.op) {
        case "replace":
        case "add":
          base[key] = patch.value;
          break;
        case "remove":
          if (Array.isArray(base)) {
            if (key === base.length - 1) base.length -= 1;
            else throw new Error("Remove can only remove the last key of an array, index: " + key + ", length: " + base.length);
          } else delete base[key];
          break;
        default:
          throw new Error("Unsupported patch operation: " + patch.op);
      }
    }
  };
  for (var i2 = 0; i2 < patches.length; i2++) {
    _loop(i2);
  }
  return draft;
}
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var defineProperty = function(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
};
var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : defineProperty({}, "immer-nothing", true);
var PROXY_STATE = typeof Symbol !== "undefined" ? Symbol("immer-proxy-state") : "__$immer_state";
var RETURNED_AND_MODIFIED_ERROR = "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.";
function verifyMinified() {
}
var inProduction = typeof process !== "undefined" && false || verifyMinified.name !== "verifyMinified";
var autoFreeze = !inProduction;
var useProxies = typeof Proxy !== "undefined" && typeof Reflect !== "undefined";
function getUseProxies() {
  return useProxies;
}
function isProxy(value) {
  return !!value && !!value[PROXY_STATE];
}
function isProxyable(value) {
  if (!value) return false;
  if ((typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") return false;
  if (Array.isArray(value)) return true;
  var proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}
function freeze(value) {
  if (autoFreeze) {
    Object.freeze(value);
  }
  return value;
}
var assign = Object.assign || function assign2(target, value) {
  for (var key in value) {
    if (has(value, key)) {
      target[key] = value[key];
    }
  }
  return target;
};
function shallowCopy(value) {
  if (Array.isArray(value)) return value.slice();
  var target = value.__proto__ === void 0 ? /* @__PURE__ */ Object.create(null) : {};
  return assign(target, value);
}
function each(value, cb) {
  if (Array.isArray(value)) {
    for (var i2 = 0; i2 < value.length; i2++) {
      cb(i2, value[i2]);
    }
  } else {
    for (var key in value) {
      cb(key, value[key]);
    }
  }
}
function has(thing, prop) {
  return Object.prototype.hasOwnProperty.call(thing, prop);
}
function finalize(base, path, patches, inversePatches) {
  if (isProxy(base)) {
    var state = base[PROXY_STATE];
    if (state.modified === true) {
      if (state.finalized === true) return state.copy;
      state.finalized = true;
      var result = finalizeObject(useProxies ? state.copy : state.copy = shallowCopy(base), state, path, patches, inversePatches);
      generatePatches(state, path, patches, inversePatches, state.base, result);
      return result;
    } else {
      return state.base;
    }
  }
  finalizeNonProxiedObject(base);
  return base;
}
function finalizeObject(copy, state, path, patches, inversePatches) {
  var base = state.base;
  each(copy, function(prop, value) {
    if (value !== base[prop]) {
      var _generatePatches = patches && !has(state.assigned, prop);
      copy[prop] = finalize(value, _generatePatches && path.concat(prop), _generatePatches && patches, inversePatches);
    }
  });
  return freeze(copy);
}
function finalizeNonProxiedObject(parent) {
  if (!isProxyable(parent)) return;
  if (Object.isFrozen(parent)) return;
  each(parent, function(i2, child) {
    if (isProxy(child)) {
      parent[i2] = finalize(child);
    } else finalizeNonProxiedObject(child);
  });
  freeze(parent);
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
var proxies = null;
var objectTraps = {
  get: get$1,
  has: function has$$1(target, prop) {
    return prop in source(target);
  },
  ownKeys: function ownKeys(target) {
    return Reflect.ownKeys(source(target));
  },
  set: set$1,
  deleteProperty,
  getOwnPropertyDescriptor,
  defineProperty: defineProperty$1,
  setPrototypeOf: function setPrototypeOf() {
    throw new Error("Immer does not support `setPrototypeOf()`.");
  }
};
var arrayTraps = {};
each(objectTraps, function(key, fn) {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if (isNaN(parseInt(prop))) throw new Error("Immer does not support deleting properties from arrays: " + prop);
  return objectTraps.deleteProperty.call(this, state[0], prop);
};
arrayTraps.set = function(state, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop))) throw new Error("Immer does not support setting non-numeric properties on arrays: " + prop);
  return objectTraps.set.call(this, state[0], prop, value);
};
function createState(parent, base) {
  return {
    modified: false,
    // this tree is modified (either this object or one of it's children)
    assigned: {},
    // true: value was assigned to these props, false: was removed
    finalized: false,
    parent,
    base,
    copy: void 0,
    proxies: {}
  };
}
function source(state) {
  return state.modified === true ? state.copy : state.base;
}
function get$1(state, prop) {
  if (prop === PROXY_STATE) return state;
  if (state.modified) {
    var value = state.copy[prop];
    if (value === state.base[prop] && isProxyable(value))
      return state.copy[prop] = createProxy(state, value);
    return value;
  } else {
    if (has(state.proxies, prop)) return state.proxies[prop];
    var _value = state.base[prop];
    if (!isProxy(_value) && isProxyable(_value)) return state.proxies[prop] = createProxy(state, _value);
    return _value;
  }
}
function set$1(state, prop, value) {
  state.assigned[prop] = true;
  if (!state.modified) {
    if (prop in state.base && is(state.base[prop], value) || has(state.proxies, prop) && state.proxies[prop] === value) return true;
    markChanged(state);
  }
  state.copy[prop] = value;
  return true;
}
function deleteProperty(state, prop) {
  state.assigned[prop] = false;
  markChanged(state);
  delete state.copy[prop];
  return true;
}
function getOwnPropertyDescriptor(state, prop) {
  var owner = state.modified ? state.copy : has(state.proxies, prop) ? state.proxies : state.base;
  var descriptor = Reflect.getOwnPropertyDescriptor(owner, prop);
  if (descriptor && !(Array.isArray(owner) && prop === "length")) descriptor.configurable = true;
  return descriptor;
}
function defineProperty$1() {
  throw new Error("Immer does not support defining properties on draft objects.");
}
function markChanged(state) {
  if (!state.modified) {
    state.modified = true;
    state.copy = shallowCopy(state.base);
    Object.assign(state.copy, state.proxies);
    if (state.parent) markChanged(state.parent);
  }
}
function createProxy(parentState, base) {
  if (isProxy(base)) throw new Error("Immer bug. Plz report.");
  var state = createState(parentState, base);
  var proxy = Array.isArray(base) ? Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps);
  proxies.push(proxy);
  return proxy.proxy;
}
function produceProxy(baseState, producer, patchListener) {
  if (isProxy(baseState)) {
    var returnValue = producer.call(baseState, baseState);
    return returnValue === void 0 ? baseState : returnValue;
  }
  var previousProxies = proxies;
  proxies = [];
  var patches = patchListener && [];
  var inversePatches = patchListener && [];
  try {
    var rootProxy = createProxy(void 0, baseState);
    var _returnValue = producer.call(rootProxy, rootProxy);
    var result = void 0;
    if (_returnValue !== void 0 && _returnValue !== rootProxy) {
      if (rootProxy[PROXY_STATE].modified) throw new Error(RETURNED_AND_MODIFIED_ERROR);
      result = finalize(_returnValue);
      if (patches) {
        patches.push({ op: "replace", path: [], value: result });
        inversePatches.push({ op: "replace", path: [], value: baseState });
      }
    } else {
      result = finalize(rootProxy, [], patches, inversePatches);
    }
    each(proxies, function(_, p) {
      return p.revoke();
    });
    patchListener && patchListener(patches, inversePatches);
    return result;
  } finally {
    proxies = previousProxies;
  }
}
var descriptors = {};
var states = null;
function createState$1(parent, proxy, base) {
  return {
    modified: false,
    assigned: {},
    // true: value was assigned to these props, false: was removed
    hasCopy: false,
    parent,
    base,
    proxy,
    copy: void 0,
    finished: false,
    finalizing: false,
    finalized: false
  };
}
function source$1(state) {
  return state.hasCopy ? state.copy : state.base;
}
function _get(state, prop) {
  assertUnfinished(state);
  var value = source$1(state)[prop];
  if (!state.finalizing && value === state.base[prop] && isProxyable(value)) {
    prepareCopy(state);
    return state.copy[prop] = createProxy$1(state, value);
  }
  return value;
}
function _set(state, prop, value) {
  assertUnfinished(state);
  state.assigned[prop] = true;
  if (!state.modified) {
    if (is(source$1(state)[prop], value)) return;
    markChanged$1(state);
    prepareCopy(state);
  }
  state.copy[prop] = value;
}
function markChanged$1(state) {
  if (!state.modified) {
    state.modified = true;
    if (state.parent) markChanged$1(state.parent);
  }
}
function prepareCopy(state) {
  if (state.hasCopy) return;
  state.hasCopy = true;
  state.copy = shallowCopy(state.base);
}
function createProxy$1(parent, base) {
  var proxy = shallowCopy(base);
  each(base, function(i2) {
    Object.defineProperty(proxy, "" + i2, createPropertyProxy("" + i2));
  });
  var state = createState$1(parent, proxy, base);
  createHiddenProperty(proxy, PROXY_STATE, state);
  states.push(state);
  return proxy;
}
function createPropertyProxy(prop) {
  return descriptors[prop] || (descriptors[prop] = {
    configurable: true,
    enumerable: true,
    get: function get$$1() {
      return _get(this[PROXY_STATE], prop);
    },
    set: function set$$1(value) {
      _set(this[PROXY_STATE], prop, value);
    }
  });
}
function assertUnfinished(state) {
  if (state.finished === true) throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(state.copy || state.base));
}
function markChangesSweep() {
  for (var i2 = states.length - 1; i2 >= 0; i2--) {
    var state = states[i2];
    if (state.modified === false) {
      if (Array.isArray(state.base)) {
        if (hasArrayChanges(state)) markChanged$1(state);
      } else if (hasObjectChanges(state)) markChanged$1(state);
    }
  }
}
function markChangesRecursively(object) {
  if (!object || (typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object") return;
  var state = object[PROXY_STATE];
  if (!state) return;
  var proxy = state.proxy, base = state.base;
  if (Array.isArray(object)) {
    if (hasArrayChanges(state)) {
      markChanged$1(state);
      state.assigned.length = true;
      if (proxy.length < base.length) for (var i2 = proxy.length; i2 < base.length; i2++) {
        state.assigned[i2] = false;
      }
      else for (var _i = base.length; _i < proxy.length; _i++) {
        state.assigned[_i] = true;
      }
      each(proxy, function(index, child) {
        if (!state.assigned[index]) markChangesRecursively(child);
      });
    }
  } else {
    var _diffKeys = diffKeys(base, proxy), added = _diffKeys.added, removed = _diffKeys.removed;
    if (added.length > 0 || removed.length > 0) markChanged$1(state);
    each(added, function(_, key) {
      state.assigned[key] = true;
    });
    each(removed, function(_, key) {
      state.assigned[key] = false;
    });
    each(proxy, function(key, child) {
      if (!state.assigned[key]) markChangesRecursively(child);
    });
  }
}
function diffKeys(from, to) {
  var a = Object.keys(from);
  var b = Object.keys(to);
  return {
    added: b.filter(function(key) {
      return a.indexOf(key) === -1;
    }),
    removed: a.filter(function(key) {
      return b.indexOf(key) === -1;
    })
  };
}
function hasObjectChanges(state) {
  var baseKeys = Object.keys(state.base);
  var keys = Object.keys(state.proxy);
  return !shallowEqual(baseKeys, keys);
}
function hasArrayChanges(state) {
  var proxy = state.proxy;
  if (proxy.length !== state.base.length) return true;
  var descriptor = Object.getOwnPropertyDescriptor(proxy, proxy.length - 1);
  if (descriptor && !descriptor.get) return true;
  return false;
}
function produceEs5(baseState, producer, patchListener) {
  if (isProxy(baseState)) {
    var returnValue = producer.call(baseState, baseState);
    return returnValue === void 0 ? baseState : returnValue;
  }
  var prevStates = states;
  states = [];
  var patches = patchListener && [];
  var inversePatches = patchListener && [];
  try {
    var rootProxy = createProxy$1(void 0, baseState);
    var _returnValue = producer.call(rootProxy, rootProxy);
    each(states, function(_, state) {
      state.finalizing = true;
    });
    var result = void 0;
    if (_returnValue !== void 0 && _returnValue !== rootProxy) {
      if (rootProxy[PROXY_STATE].modified) throw new Error(RETURNED_AND_MODIFIED_ERROR);
      result = finalize(_returnValue);
      if (patches) {
        patches.push({ op: "replace", path: [], value: result });
        inversePatches.push({ op: "replace", path: [], value: baseState });
      }
    } else {
      if (patchListener) markChangesRecursively(rootProxy);
      markChangesSweep();
      result = finalize(rootProxy, [], patches, inversePatches);
    }
    each(states, function(_, state) {
      state.finished = true;
    });
    patchListener && patchListener(patches, inversePatches);
    return result;
  } finally {
    states = prevStates;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if ((typeof objA === "undefined" ? "undefined" : _typeof(objA)) !== "object" || objA === null || (typeof objB === "undefined" ? "undefined" : _typeof(objB)) !== "object" || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (var i2 = 0; i2 < keysA.length; i2++) {
    if (!hasOwnProperty.call(objB, keysA[i2]) || !is(objA[keysA[i2]], objB[keysA[i2]])) {
      return false;
    }
  }
  return true;
}
function createHiddenProperty(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    enumerable: false,
    writable: true
  });
}
function produce(baseState, producer, patchListener) {
  if (arguments.length < 1 || arguments.length > 3) throw new Error("produce expects 1 to 3 arguments, got " + arguments.length);
  if (typeof baseState === "function") {
    if (typeof producer === "function") throw new Error("if first argument is a function (curried invocation), the second argument to produce cannot be a function");
    var initialState = producer;
    var recipe = baseState;
    return function() {
      var args = arguments;
      var currentState = args[0] === void 0 && initialState !== void 0 ? initialState : args[0];
      return produce(currentState, function(draft) {
        args[0] = draft;
        return recipe.apply(draft, args);
      });
    };
  }
  {
    if (typeof producer !== "function") throw new Error("if first argument is not a function, the second argument to produce should be a function");
    if (patchListener !== void 0 && typeof patchListener !== "function") throw new Error("the third argument of a producer should not be set or a function");
  }
  if ((typeof baseState === "undefined" ? "undefined" : _typeof(baseState)) !== "object" || baseState === null) {
    var returnValue = producer(baseState);
    return returnValue === void 0 ? baseState : normalizeResult(returnValue);
  }
  if (!isProxyable(baseState)) throw new Error("the first argument to an immer producer should be a primitive, plain object or array, got " + (typeof baseState === "undefined" ? "undefined" : _typeof(baseState)) + ': "' + baseState + '"');
  return normalizeResult(getUseProxies() ? produceProxy(baseState, producer, patchListener) : produceEs5(baseState, producer, patchListener));
}
function normalizeResult(result) {
  return result === NOTHING ? void 0 : result;
}
var applyPatches$1 = produce(applyPatches);
var immer_module_default = produce;

// node_modules/use-immer/dist/use-immer.module.js
var import_react = __toESM(require_react());
function i(o2) {
  var f2 = (0, import_react.useState)(o2), i2 = f2[1];
  return [f2[0], (0, import_react.useCallback)(function(n2) {
    i2("function" == typeof n2 ? immer_module_default(n2) : n2);
  }, [])];
}
function u(n2, t2, i2) {
  var u2 = (0, import_react.useMemo)(function() {
    return immer_module_default(n2);
  }, [n2]);
  return (0, import_react.useReducer)(u2, t2, i2);
}
export {
  i as useImmer,
  u as useImmerReducer
};
//# sourceMappingURL=use-immer.js.map
