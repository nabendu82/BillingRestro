rwlockfile
==========

[![codecov](https://codecov.io/gh/dickeyxxx/rwlockfile/branch/master/graph/badge.svg)](https://codecov.io/gh/dickeyxxx/rwlockfile)
[![Build Status](https://semaphoreci.com/api/v1/dickeyxxx/rwlockfile/branches/master/badge.svg)](https://semaphoreci.com/dickeyxxx/rwlockfile)
[![Build status](https://ci.appveyor.com/api/projects/status/2s8cyotehrtap0t2/branch/master?svg=true)](https://ci.appveyor.com/project/Heroku/rwlockfile/branch/master)

node utility for read/write lockfiles

<a name="module_rwlockfile"></a>

## rwlockfile

* [rwlockfile](#module_rwlockfile)
    * _static_
        * [.write(path, options)](#module_rwlockfile.write) ⇒ <code>Promise</code>
        * [.read(path, options)](#module_rwlockfile.read) ⇒ <code>Promise</code>
    * _inner_
        * [~hasWriter(path)](#module_rwlockfile..hasWriter)

<a name="module_rwlockfile.write"></a>

### rwlockfile.write(path, options) ⇒ <code>Promise</code>
lock for writing

**Kind**: static method of <code>[rwlockfile](#module_rwlockfile)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path of lockfile to use |
| options | <code>object</code> |  |  |
| [options.timeout] | <code>number</code> | <code>60000</code> | Max time to wait for lockfile to be open |
| [options.skipOwnPid] | <code>boolean</code> |  | Do not wait on own pid (to upgrade current process) |

<a name="module_rwlockfile.read"></a>

### rwlockfile.read(path, options) ⇒ <code>Promise</code>
lock for reading

**Kind**: static method of <code>[rwlockfile](#module_rwlockfile)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path of lockfile to use |
| options | <code>object</code> |  |  |
| [options.timeout] | <code>number</code> | <code>60000</code> | Max time to wait for lockfile to be open |

<a name="module_rwlockfile..hasWriter"></a>

### rwlockfile~hasWriter(path)
check if active writer

**Kind**: inner method of <code>[rwlockfile](#module_rwlockfile)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path of lockfile to use |

