# Domain Services API

Resources one step removed from back-end API http services.

Intended to be consumed by redux action creators and should model the domain
appropriately for this use case.

This layer also bridges the backend DTO models and view models.

Should have no knowledge of app apart from interfaces to layer below: the
back-end API data services and transformed DTOs.

The domain services (in this root directory), should abstract, separate, and
aggregate the legacy JSON APIs as-needed in order that the state services in
`../app/state/` can be a simple pass-through mechanism. This layer should also
provide appropriate caching and fault tolerance. In effect, it should emulate
a more ideal backend situation.

## The `maps/` directory and `.js` files

Contains async request functions that correspond to the raw CFI JSON endpoints.
These files also contain private DTO-to-domain mapping functions.

This is internal infrastructure that should not be consumed outside of
`domain/`.

## Future State

It is expected that the existing CFI backend APIs will be replaced by
REST APIs and the entire product may undergo extensive redesign.

Whatever ends up happening, this domain layer is meant to be adaptable to new
backend services, or a changing backend, as-needed. Hence the multiple layers
of abstraction. If the legacy CFI backend were more stable and matched to the
needs of the client app this would not be necessary.
