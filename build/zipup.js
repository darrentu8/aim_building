'use strict';

const fs = require('fs')
const path = require('path')
const cpx = require('cpx')
const fsExtra = require('fs-extra')
const makeDir = require('make-dir')

/**
 * Execute copy action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function copyAction(command, options) {
  const verbose = options.verbose

  if (!command.source || !command.destination) {
    if (verbose) {
      console.log('  - FileManagerPlugin: Warning - copy parameter has to be formated as follows: { source: <string>, destination: <string> }');
    }
    return null;
  }

  return function () {
    return new Promise(function (resolve, reject) {
      // if source is a file, just copyFile()
      // if source is a NOT a glob pattern, simply append **/*
      const fileRegex = /(\*|\{+|\}+)/g
      const matches = fileRegex.exec(command.source)

      if (matches === null) {
        fs.lstat(command.source, function (sErr, sStats) {
          if (sErr) return reject(sErr);

          fs.lstat(command.destination, function (dErr, dStats) {
            if (sStats.isFile()) {
              var destination = dStats && dStats.isDirectory() ? command.destination + '/' + path.basename(command.source) : command.destination;

              if (verbose) {
                console.log('  - FileManagerPlugin: Start copy source: ' + command.source + ' to destination: ' + destination);
              }

              /*
               * If the supplied destination is a directory copy inside.
               * If the supplied destination is a directory that does not exist yet create it & copy inside
               */

              const pathInfo = path.parse(destination)

              const execCopy = function execCopy (src, dest) {
                fsExtra.copy(src, dest, function (err) {
                  if (err) reject(err)
                  resolve()
                })
              }

              if (pathInfo.ext === '') {
                makeDir(destination).then(function (mPath) {
                  execCopy(command.source, destination + '/' + path.basename(command.source));
                });
              } else {
                execCopy(command.source, destination);
              }
            } else {
              const sourceDir = command.source + (command.source.substr(-1) !== '/' ? '/' : '') + '**/*'
              copyDirectory(sourceDir, command.destination, resolve, reject, options);
            }
          });
        });
      } else {
        copyDirectory(command.source, command.destination, resolve, reject, options);
      }
    });
  };
}

/**
 * Execute copy directory
 *
 * @param {string} source - source file path
 * @param {string} destination - destination file path
 * @param {Function} resolve - function used to resolve a Promise
 * @param {Function} reject - function used to reject a Promise
 * @return {void}
 */
function copyDirectory(source, destination, resolve, reject, options) {
  const verbose = options.verbose

  /* cpx options */

  const cpxOptions = {
    clean: false,
    includeEmptyDirs: true,
    update: false
  }

  if (verbose) {
    console.log('  - FileManagerPlugin: Start copy source file: ' + source + ' to destination file: ' + destination);
  }

  cpx.copy(source, destination, cpxOptions, function (err) {
    if (err && options.verbose) {
      console.log('  - FileManagerPlugin: Error - copy failed', err);
      reject(err);
    }

    if (verbose) {
      console.log('  - FileManagerPlugin: Finished copy source: ' + source + ' to destination: ' + destination);
    }

    resolve();
  });
}

const fs$1 = require('fs')
const mv = require('mv')

/**
 * Execute move action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function moveAction(command, options) {
  const verbose = options.verbose

  if (!command.source || !command.destination) {
    if (verbose) {
      console.log('  - FileManagerPlugin: Warning - move parameter has to be formated as follows: { source: <string>, destination: <string> }');
    }
    return null;
  }

  if (fs$1.existsSync(command.source)) {
    return function () {
      return new Promise(function (resolve, reject) {
        if (verbose) {
          console.log('  - FileManagerPlugin: Start move source: ' + command.source + ' to destination: ' + command.destination);
        }

        mv(command.source, command.destination, { mkdirp: false }, function (err) {
          if (err) {
            if (verbose) {
              console.log('  - FileManagerPlugin: Error - move failed', err);
            }
            reject(err);
          }

          if (verbose) {
            console.log('  - FileManagerPlugin: Finished move source: ' + command.source + ' to destination: ' + command.destination);
          }

          resolve();
        });
      });
    };
  } else {
    process.emitWarning('  - FileManagerPlugin: Could not move ' + command.source + ': path does not exist');
    return null;
  }
}

const fs$2 = require('fs')
const rimraf = require('rimraf')

/**
 * Execute delete action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function deleteAction(command, options) {
  const verbose = options.verbose

  return function () {
    return new Promise(function (resolve, reject) {
      if (verbose) {
        console.log('  - FileManagerPlugin: Starting delete path ' + command.source);
      }

      if (typeof command.source !== 'string') {
        if (verbose) {
          console.log('  - FileManagerPlugin: Warning - delete parameter has to be type of string. Process canceled.');
        }
        reject();
      }

      rimraf(command.source, {}, function (response) {
        if (verbose && response === null) {
          console.log('  - FileManagerPlugin: Finished delete path ' + command.source);
        }
        resolve();
      });
    });
  };
}

const makeDir$1 = require('make-dir')

/**
 * Execute mkdir action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function mkdirAction(command, options) {
  var verbose = options.verbose;


  return function () {
    if (verbose) {
      console.log('  - FileManagerPlugin: Creating path ' + command.source);
    }

    if (typeof command.source !== 'string') {
      if (verbose) {
        console.log('  - FileManagerPlugin: Warning - mkdir parameter has to be type of string. Process canceled.');
      }
      return null;
    }

    return makeDir$1(command.source);
  };
}

const fs$3 = require('fs-extra')
const path$1 = require('path')
const archiver = require('archiver')

/**
 * Execute mkdir action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function archiveAction(command, options) {
  const verbose = options.verbose
  return function () {
    return new Promise(function (resolve, reject) {
      if (!command.source || !command.destination) {
        if (verbose) {
          console.log('  - FileManagerPlugin: Warning - archive parameter has to be formated as follows: { source: <string>, destination: <string> }');
        }
        reject();
      }

      const fileRegex = /(\*|\{+|\}+)/g
      const matches = fileRegex.exec(command.source)

      const isGlob = matches !== null

      fs$3.lstat(command.source, function (sErr, sStats) {
        const output = fs$3.createWriteStream(command.destination)
        const archive = archiver(command.format, command.options)

        output.on('close', function() {
          console.log('压缩完成',archive.pointer()/1024/1024 + 'M',
                  command.destination);
          const up = typeof process.argv[2] !== 'undefined' ? process.argv[2] === 'upserver' : false;
          // console.log(up,'tesssss');
          if (up === false) {
            return ;
          }
          // const filePath = command.destination
          console.log('開始上傳............');
          const upServer = require('./upserver')
          upServer(command);
        });

        archive.on('error', function (err) {
          return reject(err);
        });
        archive.pipe(output);

        // Exclude destination file from archive
        const destFile = path$1.basename(command.destination)
        const globOptions = Object.assign({ignore: destFile}, command.options.globOptions || {})

        if (isGlob) archive.glob(command.source, globOptions);else if (sStats.isFile()) archive.file(command.source, { name: path$1.basename(command.source) });else if (sStats.isDirectory()) archive.glob('**/*', {
          cwd: command.source,
          ignore: destFile
        });
        archive.finalize().then(function () {
          return resolve();
        });
      });
    });
  };
}

const classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

const createClass = function () {
  function defineProperties (target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
}()

const toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]

    return arr2
  } else {
    return Array.from(arr)
  }
}

const FileManagerPlugin = function () {
  function FileManagerPlugin (options) {
    classCallCheck(this, FileManagerPlugin)

    this.options = this.setOptions(options)
  }

  createClass(FileManagerPlugin, [{
    key: 'setOptions',
    value: function setOptions (userOptions) {
      const defaultOptions = {
        verbose: false,
        moveWithMkdirp: false,
        onStart: {},
        onEnd: {}
      }

      for (const key in defaultOptions) {
        if (userOptions.hasOwnProperty(key)) {
          defaultOptions[key] = userOptions[key]
        }
      }

      return defaultOptions
    }
  }, {
    key: 'checkOptions',
    value: function checkOptions (stage) {
      const _this = this

      if (this.options.verbose && Object.keys(this.options[stage]).length) {
        console.log('FileManagerPlugin: processing ' + stage + ' event')
      }

      let operationList = []

      if (this.options[stage] && Array.isArray(this.options[stage])) {
        this.options[stage].map(function (opts) {
          return operationList.push.apply(operationList, toConsumableArray(_this.parseFileOptions(opts, true)))
        })
      } else {
        operationList.push.apply(operationList, toConsumableArray(this.parseFileOptions(this.options[stage])))
      }

      if (operationList.length) {
        operationList.reduce(function (previous, fn) {
          return previous.then(function (retVal) {
            return fn(retVal)
          }).catch(function (err) {
            return console.log(err)
          })
        }, Promise.resolve())
      }
    }
  }, {
    key: 'replaceHash',
    value: function replaceHash (filename) {
      return filename.replace('[hash]', this.fileHash)
    }
  }, {
    key: 'processAction',
    value: function processAction (action, params, commandOrder) {
      const result = action(params, this.options)

      if (result !== null) {
        commandOrder.push(result)
      }
    }
  }, {
    key: 'parseFileOptions',
    value: function parseFileOptions (options) {
      const _this2 = this

      const commandOrder = []

      Object.keys(options).forEach(function (actionType) {
        const actionOptions = options[actionType]
        let actionParams = null

        actionOptions.forEach(function (actionItem) {
          switch (actionType) {
            case 'copy':
              actionParams = Object.assign({source: _this2.replaceHash(actionItem.source)}, actionItem.destination && {destination: actionItem.destination})

              _this2.processAction(copyAction, actionParams, commandOrder)

              break

            case 'move':
              actionParams = Object.assign({source: _this2.replaceHash(actionItem.source)}, actionItem.destination && {destination: actionItem.destination})

              _this2.processAction(moveAction, actionParams, commandOrder)

              break

            case 'delete':
              if (!Array.isArray(actionOptions) || typeof actionItem !== 'string') {
                throw Error('  - FileManagerPlugin: Fail - delete parameters has to be an array of strings')
              }

              actionParams = Object.assign({source: _this2.replaceHash(actionItem)})
              _this2.processAction(deleteAction, actionParams, commandOrder)

              break

            case 'mkdir':
              actionParams = {source: _this2.replaceHash(actionItem)}
              _this2.processAction(mkdirAction, actionParams, commandOrder)

              break

            case 'archive':
              actionParams = {
                ...actionItem,
                source: _this2.replaceHash(actionItem.source),
                destination: actionItem.destination,
                httpServer:actionItem.httpServer,
                name:actionItem.name,
                data:actionItem.data,
                format: actionItem.format ? actionItem.format : 'zip',
                options: actionItem.options ? actionItem.options : {zlib: {level: 9}}
              }

              _this2.processAction(archiveAction, actionParams, commandOrder)

              break

            default:
              break
          }
        })
      })

      return commandOrder
    }
  }, {
    key: 'apply',
    value: function apply (compiler) {
      const that = this

      const comp = function comp (compilation) {
        try {
          that.checkOptions('onStart')
        } catch (error) {
          compilation.errors.push(error)
        }
      }

      const afterEmit = function afterEmit (compilation, cb) {
        that.fileHash = compilation.hash

        try {
          that.checkOptions('onEnd')
        } catch (error) {
          compilation.errors.push(error)
        }

        cb()
      }

      if (compiler.hooks) {
        compiler.hooks.compilation.tap('compilation', comp)
        compiler.hooks.afterEmit.tapAsync('afterEmit', afterEmit)
      } else {
        compiler.plugin('compilation', comp)
        compiler.plugin('after-emit', afterEmit)
      }
    }
  }])
  return FileManagerPlugin
}()

module.exports = FileManagerPlugin;
//# sourceMappingURL=index.js.map
